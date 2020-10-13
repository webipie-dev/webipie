const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  imgs: {type: [String], required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: false}
});

module.exports = mongoose.model('Product', productSchema);
