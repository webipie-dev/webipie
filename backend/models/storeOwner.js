const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { string } = require('joi');

const storeOwnerSchema = new Schema({
  methods: {
    type: [String],
    required: true,
    default: []
  },
  local: {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      lowercase: true, default: ''
    },
    password: {
      type: String, default: ''
    }
  },
  google: {
    id: {
      type: String, default: ''
    },
    email: {
      type: String,
      lowercase: true, default: ''
    }
  },
  facebook: {
    id: {
      type: String, default: ''
    },
    email: {
      type: String,
      lowercase: true, default: ''
    }
  },
  storeID: {
    type: Schema.Types.ObjectID,
    ref: "Store",
    required: false
  }
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

storeOwnerSchema.pre('save' , async function(next){
    try {
      if (!this.methods.includes('local')) {
        next();
      }

      //the storeOwner schema is instantiated
      const storeOwner = this;
      //check if the storeOwner has been modified to know if the password has already been hashed
      if (!storeOwner.isModified('local.password')) {
        next();
      }

      const salt = await bcrypt.genSalt(10);
      this.local.password = await bcrypt.hash(this.local.password, salt);
      next();
    } catch (error) {
        next(error);
    }
});

storeOwnerSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}

const StoreOwner = mongoose.model('storeOwner' , storeOwnerSchema);


function validatestoreOwner(storeOwner) {

    schemas = {
        authSchema: Joi.object().keys({
          name: Joi.string().min(5),
          email: Joi.string().email({minDomainSegments: 2}).required(),
          password: Joi.string().required().min(5)
        })
    }


    return schemas['authSchema'].validate(storeOwner);
}


module.exports.validatestoreOwner = validatestoreOwner;
module.exports.StoreOwner = StoreOwner;
