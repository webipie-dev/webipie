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
    img: { type: String, default: 'https://webipie-images.s3.eu-west-3.amazonaws.com/default-images/template1-banner.jpg' },
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
  about: {type: String, default: 'Our Store provides high quality products with affordable prices.\n' +
      ' Contact us on Facebook or Instagram for more information'},
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
