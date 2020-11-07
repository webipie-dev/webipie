const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  orderDate: {type: Date, default: Date.now() },
  orderStatus: {type: String, default: ''},
  totalPrice: {type: Number, default: 0},
  paymentMethod: {type: String, default: ''},
  products: [
    {
    _id: {type:  Schema.Types.ObjectID, ref: "Product", default: ''},
    quantity: {type: Number, default: 1},
    price: {type: Number, default: 0}
    }
  ],
  client: {
    _id: {type: Schema.Types.ObjectID, ref: "Client", default: ''},
    name: {type: String, default: ''}
  },
  store: {type: Schema.Types.ObjectID, ref: "Store" , default: ''}
});

module.exports = mongoose.model('Order', ExSchema);
