const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const contact = new Schema({
  phoneNumber: {type: String, default: ''},
  email: {type: String, default: ''},
  facebookPage: {type: String, default: ''},
  instagramPage: {type: String, default: ''},

});

const ExSchema = new Schema({
  name: {type: String, default: ''},
  logo: {type: String, default: ''},
  description: {type: String, default: ''},
  location: {type: String, default: ''},
  storeType: {type: String, default: ''},
  creationDate: {type: Date, default: Date.now()},
  contact: contact,
  products: [{type: Schema.Types.ObjectID, ref: "Product", default: []}],
  clients: [{type: Schema.Types.ObjectID, ref: "Client", default: []}],
});

module.exports = mongoose.model('Store', ExSchema);
