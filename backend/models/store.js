const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const contact = new Schema({
  phoneNumber: {type: String, default: ''},
  email: {type: String, default: ''},
  facebookPage: {type: String, default: ''},
  instagramPage: {type: String, default: ''},

});

const template = new Schema({
  _id: {type: Schema.Types.ObjectID, ref: "Template"},
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
  }
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
  template: template

});

module.exports = mongoose.model('Store', ExSchema);
