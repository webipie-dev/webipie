const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const address = new Schema({
  street: {type: String, default: ''},
  houseNumber: {type: String, default: ''},
  city: {type: String, default: ''},
  state: {type: String, default: ''},
  zipCode: {type: String, default: ''},
});

const ExSchema = new Schema({
  firstname: {type: String, default: ''},
  lastname: {type: String, default: ''},
  // INDEX BY phoneNUMber or STORE ??????
  phoneNumber: {type: String, default: ''},
  email: {type: String, default: ''},
  gender: {type: String, default: ''},
  fullAddress: address,
  store: { type: Schema.Types.ObjectID, ref: "Store" }

});

module.exports = mongoose.model('Client', ExSchema);
