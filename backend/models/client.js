const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const address = new Schema({
  street: {type: String},
  houseNumber: {type: String},
  city: {type: String},
  state: {type: String},
  zipCode: {type: String},
});

const ExSchema = new Schema({
  firstname: {type: String},
  lastname: {type: String},
  phoneNumber: {type: String},
  email: {type: String},
  gender: {type: String},
  fullAddress: address

});

module.exports = mongoose.model('Client', ExSchema);
