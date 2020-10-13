const express = require('express');
const router = require('express-promise-router')();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConf = require('../middlewares/passport');
const UsersService = require('../services/users');

// const {JWT_SECRET} = require('../configuration');
const { validateUser , User } = require('../models/user');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });

router.route('/signup')
    .post(UsersService.signUp);

router.route('/signin')
    .post(passportSignIn, UsersService.signIn);

router.route('/oauth/google')
    .post(passport.authenticate('googleToken', { session: false }), UsersService.googleOAuth);

router.route('/oauth/facebook')
    .post(passport.authenticate('facebookToken', { session: false }), UsersService.facebookOAuth);

router.post('/secret' , passportJWT , async (req,res) => {
    console.log('secret')
    res.send('resource');
});


module.exports = router;

