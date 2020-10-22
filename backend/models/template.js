const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  name: {type: String},
  colorChart: {type: [String]},
  font: {
    name: String,
    size: Number,
    weight: String,
    alignment: String,
    bold: Boolean,
    italic: Boolean,
    uppercase: Boolean,
  },
  store: {type: Schema.Types.ObjectID, ref: "Store" }
});

module.exports = mongoose.model('Template', ExSchema);
