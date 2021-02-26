const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const contact = new Schema({
  phoneNumber: {type: String, default: ''},
  email: {type: String, default: ''},
  facebookPage: {type: String, default: ''},
  instagramPage: {type: String, default: ''},
  location: {type: String, default: ''}

});

const template = new Schema({
  id: {type: Schema.Types.ObjectID, ref: "Template"},
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

const ExSchema = new Schema({
  url: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  logo: {type: String, default: ''},
  description: {type: String, default: ''},
  storeType: {type: String, default: ''},
  creationDate: {type: Date, default: Date.now()},
  contact: contact,
  template: template

},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  });

module.exports = mongoose.model('Store', ExSchema);
