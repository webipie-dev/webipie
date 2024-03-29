const Order = require('../models/order')
const Product = require('../models/product')
const Client = require('../models/client')
const Store = require('../models/store')
const ApiError = require("../errors/api-error");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../configuration/index');
const { StoreOwner } = require('../models/storeOwner');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: config.EMAIL.USER,
    pass: config.EMAIL.PASSWORD,
  },
})
);

// getAndFilterOrder
const getOrders = async (req, res) => {
  const orders = await Order.find(req.query).populate('client')
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(orders);
}



const getOneOrder = async (req, res) => {
  //get the order id
  const { id } = req.params;

  const order = await Order.findById(id).populate('client')
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!order) {
    next(ApiError.NotFound('Order Not Found'));
    return;
  }

  res.status(200).send(order);
}

const addOrder = async (req, res, next) => {

  const { orderStatus, paymentMethod, productsOrder, clientId, storeId, totalPrice } = req.body

  const store = await Store.findById(storeId)
  if (!store) {
    next(ApiError.NotFound('Store Not Found'));
    return;
  }

  const storeOwner = await StoreOwner.findOne({storeID: storeId});

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

  await Product.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  // set status to out of stock
  await Product.updateMany({quantity: {$lte: 0}}, {status: 'out of stock'})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  // send notification
  const io = req.app.get('socketio');
  io.emit('new order', order);

  // send mail to storeowner

  const mailOptions = {
    from: config.EMAIL.USER,
    to: storeOwner.local.email || storeOwner.google.email || storeOwner.facebook.email,
    subject: 'New order',
    text: 'You have a new order from ' +
      String(client.firstname) + ' ' +
      String(client.lastname) +
      '. You can call your client on ' +
      String(client.phoneNumber) +
      ' and contact him on ' +
      String(client.email),
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(201).send(order);

}


const deleteManyOrders = async (req, res, next) => {
  //get orders ids
  const { ids } = req.body;

  const deletedOrders = await Order.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (deletedOrders) {
    if (deletedOrders.deletedCount === 0) {
      next(ApiError.NotFound('No Orders found to delete'));
      return;
    }
  }

  res.status(200).send(deletedOrders);
};

const deleteAllOrders = async (req, res, next) => {
  const deletedOrders = await Order.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(deletedOrders);
};

//edit many orders
const editOrder = async (req, res, next) => {
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
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (orderEdited){
    if (orderEdited.nModified === 0) {
      next(ApiError.NotFound('No Orders modified'));
      return;

    }
  }

  const order = await Order.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  for(const key in req.body) {
    if(key ==='orderStatus'){
      const mailOptions = {
        from: config.EMAIL.USER,
        to: order.client.email,
        subject: 'Updated order',
        text: 'You have an update to your order with status to ' + String(order.orderStatus),
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  }

  res.status(200).send(order);
};


const deleteProductOrder = async (req,res, next) => {
  //get order id
  const { id } = req.body;

  const orderDeleted = await Order.updateOne({_id: id}, {$pull: {products: {id : req.body.product}}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (orderDeleted){
    if (orderDeleted.nModified === 0) {
      next(ApiError.NotFound('No Orders modified'));
      return;
    }
  }

  res.status(200).send(orderDeleted);


}

const refundProducts = async (req, res, next) => {
  const { products } = req.body

  let bulkQueries = [];
  products.map(product => {
    bulkQueries.push({
      updateOne: {
        "filter": { _id: product.id},
        "update":{$inc: {quantity: product.quantity}}
      }
    })
  });
  Product
    .bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).json('Products refunded');

}

module.exports = {
  getOneOrder,
  getOrders,
  addOrder,
  editOrder,
  deleteProductOrder,
  deleteAllOrders,
  deleteManyOrders,
  refundProducts
};
