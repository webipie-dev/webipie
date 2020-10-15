const Order = require('../models/order')
const Product = require('../models/product')
const Client = require('../models/client')


const mongoose = require('mongoose')

// getAndFilterOrder
exports.getOrders = (req, res) => {
  Order.find(req.query)
    .then((documents) => {
      res.status(200).json({
        message: 'Orders sent successfully',
        orders: documents
      })
    }).catch(err => {
    res.status(500).json({error: err})
  });
}

exports.getOneOrder = (req, res) => {
  const id = req.params._id;
  Order.findById(id)
    .exec()
    .then(doc => {
      // console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({error: err})
    });
}

exports.addOrder = async (req, res) => {
  const order = new Order({
    orderDate: req.body.orderDate,
    orderStatus: req.body.orderStatus,
    totalPrice: req.body.totalPrice,
    paymentMethod: req.body.paymentMethod,
    products: req.body.products,
    client: req.body.client,

  });
  // order
  //   .save()
  //   .then(doc => {
  //     res.status(201).json({
  //       message: 'added with success',
  //       order: doc
  //     });
  //   }).catch(err => {
  //   res.status(500).json({error: err});
  // });

  order
    .save()
    .then(doc =>{
      Client
        .updateOne({ _id : doc.client }, {$push: {orders: doc._id}})
        .exec();

      let bulkQueries = [];
      doc.products.map(product => {
        bulkQueries.push({
          updateOne: {
            "filter": { _id: product._id},
            "update":{$inc: {quantity: -product.quantity}}
          }
        })
      });
      Product
        .bulkWrite(bulkQueries, {ordered: false})

      res.status(201).json({
        message: 'added with success',
        order: doc,
        // product: product
      });
    }).catch(err => {
    res.status(500).json({error: err});
  });


}


exports.deleteManyOrders = (req, res, next) => {
  // console.log(req.body)
  const ids = req.body.ids;
  // console.log(ids)
  Order.deleteMany({_id: {$in: ids}})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.deleteAllOrders = (req, res, next) => {
  Order.deleteMany({})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};


exports.editOrder = (req, res, next) => {
  // separating the ids
  const ids = req.body.ids;

  // separating the updates
  const edits = {};
  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)) {
      if(key !== 'ids'){
        edits[key] = req.body[key];
      }
    }
  }

  Order.updateMany({_id: {$in :ids}}, { $set: edits })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        edits: edits,
        result: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};



