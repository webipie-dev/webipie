const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExSchema = new Schema({
  orderDate: {type: Date, default: Date.now() },
  orderStatus: {type: String, default: 'Pending'},
  paymentMethod: {type: String, default: ''},
  products: [{
    id: {type: Schema.Types.ObjectID, ref: "Product"},
    quantity: { type: Number, default: 0},
    name: {type: String, required: false, default: ''},
    imgs: {type: [String], required: false, default: ''},
    price: {type: Number, required: false, default: 0},
  }],
  totalPrice: {type: Number, default: 0},
  client: {type: Schema.Types.ObjectID, ref: "Client"},
  store: {type: Schema.Types.ObjectID, ref: "Store"}
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  });


module.exports = mongoose.model('Order', ExSchema);
