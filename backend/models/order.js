const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  orderDate: {type: Date, default: Date.now()},
  orderStatus: {type: String},
  totalPrice: {type: Number},
  paymentMethod: {type: String},
});

module.exports = mongoose.model('Order', ExSchema);
