const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  name: {type: String},
  colorChart: {type: [String]},
  font: {type: String},
  // client: {type: Schema.Types.ObjectID, ref: "Client" }
  store: {type: Schema.Types.ObjectID, ref: "Store" }
});

module.exports = mongoose.model('Template', ExSchema);
