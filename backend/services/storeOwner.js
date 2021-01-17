const JWT = require('jsonwebtoken');
const {validatestoreOwner , StoreOwner} = require('../models/storeOwner');
const { JWT_SECRET } = require('../configuration');
const mongoose = require('mongoose');

signToken = user => {
    return JWT.sign({
        iss: 'NameOfProject',
        sub: user.id,
        storeID: user.storeID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1 )
    }, JWT_SECRET );
};


module.exports = {
    signUp : async (req,res) => {
        const { error } = validatestoreOwner(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { email,password } = req.body;
        const storeID = new mongoose.mongo.ObjectId();

        let findstoreOwner = await StoreOwner.find({ "local.email": email }).limit(1);
        findstoreOwner = findstoreOwner[0];
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
              password: password
            }
            await findstoreOwner.save()
            // Generate the token
            const token = signToken(findstoreOwner);
            // Respond with token
            res.cookie('access_token', token, {
              httpOnly: true
            });
            res.status(200).json({ success: true });
        }


        const newstoreOwner = new StoreOwner({
            methods: ['local'],
            local: {
                email: email,
                password: password
            },
            storeID
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
        console.log(req)
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {

        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ token });
    },

    facebookOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ token });
    }

}
