const JWT = require('jsonwebtoken');
const {validatestoreOwner , StoreOwner} = require('../models/storeOwner');
const { JWT_SECRET } = require('../configuration');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ApiError = require("../errors/api-error");

signToken = user => {
    return JWT.sign({
        iss: 'NameOfProject',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1 )
    }, JWT_SECRET );
};


module.exports = {
    signUp : async (req,res) => {
        const { error } = validatestoreOwner(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { email,password } = req.body;
        let findstoreOwner = await StoreOwner.findOne({ "local.email": email });
        if (findstoreOwner) return res.status(403).send({ errors: 'Email is already in use'});

        findstoreOwner = await StoreOwner.find({
            $or: [
              { "google.email": email },
              { "facebook.email": email },
            ]
          }).limit(1);
          findstoreOwner = findstoreOwner[0];
          if (findstoreOwner) {
            // Let's merge them?
            findstoreOwner.methods.push('local')
            findstoreOwner.local = {
              email: email,
              password: password.trim()
            }
            await findstoreOwner.save()
            // Generate the token
            const token = signToken(findstoreOwner);
            // Respond with token
            res.cookie('access_token', token, {
              httpOnly: true
            });
            res.status(200).json({ token, storeId: findstoreOwner.storeID });
        }


        const newstoreOwner = new StoreOwner({
            methods: ['local'],
            local: {
                email: email,
                password: password.trim()
            },
        });
        await newstoreOwner.save();

        const token = signToken(newstoreOwner);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        return res.status(200).json({ token });
    },

    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        // const storeId = await StoreOwner.findOne({email: req.user.local.email});
        res.status(200).json({ token, storeId: req.user.storeID });
    },

    changePwd: async (req,res,next) =>{
        const user = req.user;
        const { oldPassword, newPassword } = req.body;

        if (! req.user.methods.includes('local')) {
            return next(ApiError.BadRequest('you are not connected locally'));
        }

        const password_comp = await bcrypt.compare(oldPassword, req.user.local.password);
        if(! password_comp){
            return next(ApiError.BadRequest('old password is not correct'));
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        await StoreOwner.update({"local.email": user.local.email},{"local.password": passwordHash });
        return res.status(200).json({success: "success"})

    },

    googleOAuth: async (req, res, next) => {

        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ token, storeId: req.user.storeID });
    },

    facebookOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ token, storeId: req.user.storeID });
    }

}
