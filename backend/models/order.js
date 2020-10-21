const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  orderDate: {type: Date, default: Date.now()},
  orderStatus: {type: String},
  totalPrice: {type: Number},
  paymentMethod: {type: String},
  products: [
    {
    _id: {type:  Schema.Types.ObjectID, ref: "Product"},
    quantity: {type: Number, default: 1}
    }
  ],
  client: {type: Schema.Types.ObjectID, ref: "Client" },
  store: {type: Schema.Types.ObjectID, ref: "Store" }
});

module.exports = mongoose.model('Order', ExSchema);
