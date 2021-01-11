const Order = require('../models/order')
const Product = require('../models/product')
const Client = require('../models/client')
const Store = require('../models/store')


// getAndFilterOrder
exports.getOrders = async (req, res) => {

  // I THINK ORDERS NEED TO BE INDEXED BY STORE ID
  // We need to check if the store id connected is the same store is provided in the requireAuth

  const orders = await Order.find(req.query).populate('client')
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(200).send(orders);
}

// exports.getManyOrderById = (req, res) =>{
//   //get orders ids
//   const orderId = req.query.ids;
//
//   Order
//     .find({_id: {$in: orderId}})
//     .exec()
//     .then(order => {
//       if(order) {
//         res.status(200).json({
//           message: 'orders fetched successfully',
//           count: order.length,
//           order: order
//         });
//       } else {
//         res.status(404).json({error: 'not found'});
//       }
//     })
//     .catch(err => {
//       res.status(500).json({error: err});
//     });
// }


exports.getOneOrder = async (req, res) => {

  // We need to check if the store id connected is the same store is provided in the requireAuth

  //get the order id
  const { id } = req.params;

  const order = await Order.findById(id).populate('client')
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(200).send(order);
}

exports.addOrder = async (req, res) => {

  // productsOrders schema :
  // productsOrder = {
  //   ids: ['444444',555555],
  //   products : [
  //     {
  //       _id: '44444',
  //       quantity: 1,
  //       name,
  //       imgs,
  //       price
  //
  //     },
  //     {
  //       _id: '555555',
  //       quantity: 1
  //       name,
  //       imgs,
  //       price
  //     }
  //   ]
  // }

  const { orderStatus, paymentMethod, productsOrder, clientId, storeId } = req.body

  const store = await Store.findById(storeId)

  if (!store) {
    throw new Error('Store Not Found')
  }

  const client = await Client.findById(clientId)

  if (!client) {
    throw new Error('Client Not Found')
  }

  const prods = await Product.find({_id: {$in: productsOrder.ids}})

  if (prods.length !== productsOrder.ids.length) {
    throw new Error('Products not found')
  }

  let totalPrice = 0
  for (let i=0; i < productsOrder.products.length; i++) {
      totalPrice += productsOrder.products[i].price * productsOrder.products[i].quantity
  }

  const order = new Order({
    orderStatus,
    paymentMethod,
    products: productsOrder.products,
    totalPrice,
    client,
    store,

  });
  await order.save();

  let bulkQueries = [];
  productsOrder.products.map(product => {
    bulkQueries.push({
      updateOne: {
        "filter": { _id: product._id},
        "update":{$inc: {quantity: -product.quantity}}
      }
    })
  });
  Product
    .bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(201).send(order);

}


exports.deleteManyOrders = async (req, res, next) => {
  //get orders ids
  const { ids } = req.body;

  const deletedOrders = await Order.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  if (deletedOrders) {
    if (deletedOrders.deletedCount === 0) {
      throw new Error('No Orders found to delete')
    }else if (deletedOrders.deletedCount < ids.length) {
      throw new Error(`${ids.length} Orders to be deleted but ${deletedOrders.deletedCount} are found and deleted`)

    }
  }

  res.status(200).send(deletedOrders);
};

exports.deleteAllOrders = async (req, res, next) => {
  const deletedOrders = await Order.deleteMany({})
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(200).send(deletedOrders);
};

//edit many orders
exports.editOrder = async (req, res, next) => {
  // If you want to change something in the products or total price youll have to resend the whole document


  // separating the id
  const { id } = req.params;

  // separating the updates
  const edits = {};
  for(var key in req.body) {
      if(key !== 'id'){
        edits[key] = req.body[key];

      }
  }

  const orderEdited = await Order.updateOne({_id: id}, { $set: edits })
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  if (orderEdited){
    if (orderEdited.nModified === 0) {
      throw new Error('No Orders modified')

    }
  }


  res.status(200).send(orders);
};


exports.deleteProductOrder = async (req,res) => {
  //get order id
  const { id } = req.body;

  const orderDeleted = await Order.updateOne({_id: id}, {$pull: {products: {_id : req.body.product}}})
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  if (orderDeleted){
    if (orderDeleted.nModified === 0) {
      throw new Error('No Orders modified')

    }
  }

  res.status(200).send(orderDeleted);


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



