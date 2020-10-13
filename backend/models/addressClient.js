const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ExSchema = new Schema({
  street: {type: String},
  houseNumber: {type: String},
  city: {type: String},
  state: {type: String},
  zipCode: {type: String},
  client : {type:  Schema.Types.ObjectID, ref: "Client"}
});

module.exports = mongoose.model('addressClient', ExSchema);
