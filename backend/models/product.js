const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
  name: {type: String, required: false, default: ''},
  description: {type: String, required: false, default: ''},
  imgs: {type: [String], required: false, default: ''},
  price: {type: Number, required: false, default: 0},
  quantity: {type: Number, required: false, default: 0, min: 0},
  store: {type: Schema.Types.ObjectID, ref: "Store", default: ''}

});

module.exports = mongoose.model('Product', productSchema);
