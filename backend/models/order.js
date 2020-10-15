const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  orderDate: {type: Date, default: Date.now()},
  orderStatus: {type: String},
  totalPrice: {type: Number},
  paymentMethod: {type: String},
  products: [
    {
      id : {type:  Schema.Types.ObjectID, ref: "Product" },
      quantity: {type: Number}
    }],
  client: {type: Schema.Types.ObjectID, ref: "Client", }
});

module.exports = mongoose.model('Order', ExSchema);
