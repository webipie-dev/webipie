const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const address = new Schema({
  street: {type: String, default: ''},
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
  fullAddress: address,
  store: { type: Schema.Types.ObjectID, ref: "Store" }

},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.fullAddress._id
      }
    }
  });

module.exports = mongoose.model('Client', ExSchema);
