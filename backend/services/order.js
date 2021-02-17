const Order = require('../models/order')
const Product = require('../models/product')
const Client = require('../models/client')
const Store = require('../models/store')
const ApiError = require("../errors/api-error");


// getAndFilterOrder
exports.getOrders = async (req, res) => {

  // I THINK ORDERS NEED TO BE INDEXED BY STORE ID
  // We need to check if the store id connected is the same store is provided in the requireAuth

  // add the store_id to the query
  req.query.store = req.params.storeID;

  const orders = await Order.find(req.query).populate('client')
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(orders);
}



exports.getOneOrder = async (req, res) => {

  // We need to check if the store id connected is the same store is provided in the requireAuth

  //get the order id
  const { id } = req.params;

  const order = await Order.findById(id).populate('client')
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (!order) {
    next(ApiError.NotFound('Order Not Found'));
    return;
  }

  res.status(200).send(order);
}

exports.addOrder = async (req, res, next) => {

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
    next(ApiError.NotFound('Store Not Found'));
    return;
  }

  const client = await Client.findById(clientId)

  if (!client) {
    next(ApiError.NotFound('Client Not Found'));
    return;
  }

  const prods = await Product.find({_id: {$in: productsOrder.ids}})

  if (prods.length !== productsOrder.ids.length) {
    next(ApiError.NotFound('One or more products Not Found'));
    return;
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
      res.status(400).json({errors: err.message});
    });

  res.status(201).send(order);

}


exports.deleteManyOrders = async (req, res, next) => {
  //get orders ids
  const { ids } = req.body;

  const deletedOrders = await Order.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (deletedOrders) {
    if (deletedOrders.deletedCount === 0) {
      next(ApiError.NotFound('No Orders found to delete'));
      return;
    }
  }

  res.status(200).send(deletedOrders);
};

exports.deleteAllOrders = async (req, res, next) => {
  const deletedOrders = await Order.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: err.message});
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
  for(const key in req.body) {
      if(key !== 'id'){
        edits[key] = req.body[key];

      }
  }

  const orderEdited = await Order.updateOne({_id: id}, { $set: edits })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (orderEdited){
    if (orderEdited.nModified === 0) {
      next(ApiError.NotFound('No Orders modified'));
      return;

    }
  }


  res.status(200).send(orders);
};


exports.deleteProductOrder = async (req,res, next) => {
  //get order id
  const { id } = req.body;

  const orderDeleted = await Order.updateOne({_id: id}, {$pull: {products: {_id : req.body.product}}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (orderDeleted){
    if (orderDeleted.nModified === 0) {
      next(ApiError.NotFound('No Orders modified'));
      return;
    }
  }

  res.status(200).send(orderDeleted);


}



