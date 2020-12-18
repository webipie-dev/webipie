const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  name: {type: String, default: ''},
  header: {
    img: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    mainButton: { type: String, default: '' }
  },
  colorChart: {type: [String], default: []},
  font: {
    name: { type: String, default: '' },
    size: { type: Number, default: 0 },
    weight: { type: String, default: '' },
    alignment: { type: String, default: '' },
    bold: { type: Boolean, default: false },
    italic: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false },
  }
});

module.exports = mongoose.model('Template', ExSchema);
