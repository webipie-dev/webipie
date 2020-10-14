const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  imgs: {type: [String], required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: false},
  order: {type:  Schema.Types.ObjectID, ref: "Order" }

});

module.exports = mongoose.model('Product', productSchema);
