const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExSchema = new Schema({
  firstname: {type: String},
  lastname: {type: String},
  phoneNumber: {type: String},
  email: {type: String},
  gender: {type: String},
  fullAddress: {type: Schema.Types.ObjectID, ref: "AddressClient"}

});

module.exports = mongoose.model('Client', ExSchema);
