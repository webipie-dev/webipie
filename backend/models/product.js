const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
  name: {type: String, required: false},
  description: {type: String, required: false},
  imgs: {type: [String], required: false},
  price: {type: Number, required: false},
  quantity: {type: Number, required: false},
  store: {type: Schema.Types.ObjectID, ref: "Store"}

});

module.exports = mongoose.model('Product', productSchema);
