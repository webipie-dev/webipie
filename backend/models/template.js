const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  name: {type: String, default: ''},
  colorChart: {type: [String], default: []},
  font: {
    name: String,
    size: Number,
    weight: String,
    alignment: String,
    bold: Boolean,
    italic: Boolean,
    uppercase: Boolean,
  },
  store: {type: Schema.Types.ObjectID, ref: "Store", default: '' }
});

module.exports = mongoose.model('Template', ExSchema);
