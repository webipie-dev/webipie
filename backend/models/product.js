const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const review = new Schema({
  name: {type: String, default: ''},
  email: {type: String, default: ''},
  review: {type: String, default: ''},
  rating: {type: String, default: ''},
  date: {type: Date, default: Date.now()},
});

const productSchema = mongoose.Schema({
  name: {type: String, required: false, default: ''},
  description: {type: String, required: false, default: ''},
  imgs: {type: [String], required: false, default: ''},
  price: {type: Number, required: false, default: 0},
  quantity: {type: Number, required: false, default: 0, min: 0},
  status: {type: String, required: false, default: 'disponible'},
  popular: {type: Boolean, required: false, default: false},
  openReview: {type: Boolean, required: false, default: true},
  reviews: [review],
  store: {type: Schema.Types.ObjectID, ref: "Store", default: ''}

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

module.exports = mongoose.model('Product', productSchema);
