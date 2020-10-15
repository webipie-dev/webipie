const express = require('express');
const router = require('express-promise-router')();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConf = require('../middlewares/passport');
const storeOwnerService = require('../services/storeOwner');

// const {JWT_SECRET} = require('../configuration');
const { validatestoreOwner , storeOwner } = require('../models/storeOwner');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });

router.route('/signup')
    .post(storeOwnerService.signUp);

router.route('/signin')
    .post(passportSignIn, storeOwnerService.signIn);

router.route('/oauth/google')
    .post(passport.authenticate('googleToken', { session: false }), storeOwnerService.googleOAuth);

router.route('/oauth/facebook')
    .post(passport.authenticate('facebookToken', { session: false }), storeOwnerService.facebookOAuth);

router.post('/secret' , passportJWT , async (req,res) => {
    console.log('secret')
    res.send('resource');
});


module.exports = router;

