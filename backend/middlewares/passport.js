const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('../configuration');
const {StoreOwner} = require('../models/storeOwner');


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET,
    passReqToCallback: true
  }, async (req, payload, done) => {
    try {
      // Find the storeOwner specified in token
      const storeOwner = await StoreOwner.findById(payload.sub);

      // If storeOwner doesn't exists, handle it
      if (!storeOwner) {
        return done(null, false);
      }
  
      // Otherwise, return the storeOwner
      req.storeOwner = storeOwner;
      done(null, storeOwner);
    } catch(error) {
      done(error, false);
    }
}));

// GOOGLE OAUTH STRATEGY 
passport.use('googleToken' , new GooglePlusTokenStrategy({
  clientID : '790108924491-t5da8keoe1srskluak4jpi4oue78gcai.apps.googleusercontent.com',
  clientSecret : 'oQwzeTlMcqnoAT96ZsQpZkFQ'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);

    const existingStoreOwner = await StoreOwner.find({"google.id" : profile.id}).limit(1);
    if (existingStoreOwner){
      console.log('storeOwner already exists in BD');
      return done(null, existingStoreOwner);
    }

    console.log('StoreOwner dosen\'t exist we create new one');

    const newStoreOwner = new StoreOwner({
      method: ['google'],
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newStoreOwner.save();
    done(null, newStoreOwner);
  } catch (error) {
    done(error, false, error.message);
  }
}));


// FACEBOOK OAUTH STRATEGY
passport.use('facebookToken' , new FacebookTokenStrategy({
  clientID : '348023999826107',
  clientSecret: '097f813e65edd9538d6606b09b562bd7'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);

    const existingStoreOwner = await StoreOwner.find({"facebook.id" : profile.id}).limit(1);
    if (existingStoreOwner){
      console.log('storeOwner already exists in BD');
      return done(null, existingStoreOwner);
    }

    console.log('StoreOwner dosen\'t exist we create new one');

    const newStoreOwner = new StoreOwner({
      methods: ['facebook'],
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newStoreOwner.save();
    done(null, newStoreOwner);
  } catch (error) {
    done(error, false, error.message);
  }
}));


// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the storeOwner given the email
    let storeOwner = await StoreOwner.find({ "local.email": email }).limit(1);
    storeOwner = storeOwner[0]

    // If not, handle it
    if (!storeOwner) {
      return done(null, false);
    }

    // console.log(storeOwner)
    // Check if the password is correct
    const isMatch = await storeOwner.isValidPassword(password);
  
    // console.log(isMatch)
    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }
  
    // Otherwise, return the storeOwner
    done(null, storeOwner);
  } catch(error) {
    done(error, false);
  }
}));