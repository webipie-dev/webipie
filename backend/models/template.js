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
  colorChart: {type: {}, default: {}},
  colorChartOptions: {type: [{}], default: []},
  font: { type: String, default: ''},
  fontOptions: { type: [String], default: []}
});

module.exports = mongoose.model('Template', ExSchema);
