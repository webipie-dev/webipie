const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const contact = new Schema({
  phoneNumber: {type: String},
  facebookPage: {type: String},
  instagramPage: {type: String},

});

const ExSchema = new Schema({
  name: {type: String},
  logo: {type: String},
  description: {type: String},
  location: {type: String},
  storeType: {type: String},
  creationDate: {type: Date, default: Date.now()},
  contact: contact,

});

module.exports = mongoose.model('Store', ExSchema);
