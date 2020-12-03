const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const storeOwnerSchema = new mongoose.Schema({
  methods: {
    type: [String],
    required: true,
    default: []
  },
  local: {
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
});

storeOwnerSchema.pre('save' , async function(next){
    try {
      console.log('entered');
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
      const passwordHash = await bcrypt.hash(this.local.password, salt);

      this.local.password = passwordHash;
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
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
    }


    return schemas['authSchema'].validate(storeOwner);
}


module.exports.validatestoreOwner = validatestoreOwner;
module.exports.StoreOwner = StoreOwner;


