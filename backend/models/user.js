const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  methods: {
    type: [String],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

userSchema.pre('save' , async function(next){
    try {
      console.log('entered');
      if (!this.methods.includes('local')) {
        next();
      }

      //the user schema is instantiated
      const user = this;
      //check if the user has been modified to know if the password has already been hashed
      if (!user.isModified('local.password')) {
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

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}

const User = mongoose.model('user' , userSchema);


function validateUser(user) {

    schemas = {
        authSchema: Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
    }

  
    return schemas['authSchema'].validate(user);
}
  

module.exports.validateUser = validateUser;
module.exports.User = User;


