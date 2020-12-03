const Order = require('../models/order')
const Product = require('../models/product')
const Client = require('../models/client')
const Store = require('../models/store')


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

exports.getManyOrderById = (req, res) =>{
  //get orders ids
  const orderId = req.query.ids;

  Order
    .find({_id: {$in: orderId}})
    .exec()
    .then(order => {
      if(order) {
        res.status(200).json({
          message: 'orders fetched successfully',
          count: order.length,
          order: order
        });
      } else {
        res.status(404).json({error: 'not found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
}


exports.getOneOrder = (req, res) => {
  //get the order id
  const id = req.params._id;
  Order.findById(id)
    .exec()
    .then(doc => {
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
    paymentMethod: req.body.paymentMethod,
    products: req.body.products,
    client: req.body.client,
    store: req.body.store,

  });

  order
    .save()
    .then(doc =>{
      //adding the order id to the client
      Client
        .updateOne({ _id : doc.client._id }, {$push: {orders: doc._id}})
        .exec();
      //updating the quantity of the product in the product model
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
      //add the client id to the store
      Store
        .updateOne({_id : doc.store }, {$addToSet: {clients: doc.client._id}})
        .exec()
      res.status(201).json({
        message: 'added with success',
        order: doc,
      });
    }).catch(err => {
    res.status(500).json({error: err});
  });


}


exports.deleteManyOrders = (req, res, next) => {
  //get orders ids
  const ids = req.body;

  Order.deleteMany({_id: {$in: ids}})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
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

//edit many orders
exports.editOrder = (req, res, next) => {
  // separating the ids
  const ids = req.body.ids;

  // separating the updates
  const edits = {};
  for(var key in req.body) {
      if(key !== 'ids'){
        edits[key] = req.body[key];

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


exports.deleteProductOrder = (req,res) => {
  //get order id
  const ids = req.body.ids;

  Order.updateOne({_id: ids}, {$pull: {products: {_id : req.body.product}}})
    .then(doc => {
      res.status(200).json({
            message: 'Product deleted successfully from the order',
            order: doc,
          })
    })
}


// exports.detailOrder = (req, res) => {
//   const id = req.params._id;
//   let prodId = []
//   let prods = {}
//   Order.findById(id)
//     .exec()
//     .then(doc => {
//       doc.products.map(elem => {
//         prodId.push(elem._id)
//       })
//       prods["_id"] = prodId
//       Product.find(prods)
//         .then((documents) => {
//           res.status(200).json({
//             message: 'Products fetched successfully',
//             order: doc,
//             products: documents
//           })
//         })
//     })
//     .catch(err => {
//       // console.log(err);
//       res.status(500).json({error: err})
//     });
// }



