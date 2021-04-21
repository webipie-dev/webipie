const JWT = require('jsonwebtoken');
const {validatestoreOwner , StoreOwner} = require('../models/storeOwner');
const { JWT_SECRET, EMAIL } = require('../configuration');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ApiError = require("../errors/api-error");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: EMAIL.USER,
      pass: EMAIL.PASSWORD,
    },
  })
);

signToken = user => {
    return JWT.sign({
        iss: 'NameOfProject',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1 )
    }, JWT_SECRET );
};


module.exports = {
    signUp : async (req,res,next) => {
        const { error } = validatestoreOwner(req.body);
        if (error) return next(ApiError.BadRequest(error.details[0].message));
      
        const { name,email,password } = req.body;
      
        let findstoreOwner = await StoreOwner.findOne({ "local.email": email });
        if (findstoreOwner) return next(ApiError.BadRequest('Email is already in use'));

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
              name: name,
              email: email,
              password: password.trim(),
              verified: true
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
                name: name,
                email: email,
                password: password.trim()
            },
        });
        await newstoreOwner.save();
        const token = signToken(newstoreOwner);

        // send mail of verification 
        const mailOptions = { 
            from: EMAIL.USER, 
            to: email, 
            subject: 'Account Verification', 
            text: 'Hello '+ name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/storeOwner\/confirmation\/' + email + '\/' + token + '\n\nThank You!\n' 
        };

        transporter.sendMail(mailOptions, function (err) {
            if (err) { 
                return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                }
            return res.status(200).send('A verification email has been sent to ' + email + '. It will be expire after one day. If you not get verification Email click on resend token.');
        });
      
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

        res.status(200).json({ token, storeId: req.user.storeID, verified: req.user.local.verified });
    },

    confirmEmail: async(req, res, next) => {
        try {
            const token = req.params.token;
            const payload = JWT.verify(token, JWT_SECRET);
            const storeOwner = await StoreOwner.findById(payload.sub);
            if (!storeOwner) {
                return next(ApiError.Unauthorized('You don\'t have an account'));
            }

            storeOwner.local.verified = true;
            await storeOwner.save();

            res.send(200).json({message: "successful confirmation!"});
        } catch(err) {
            return next(ApiError.BadRequest('Your verification link may have expired. Please click on resend for verify your Email.'));
        }      
    },

    resend: async(req, res, next) => {
        const token = req.params.token;
        const payload = JWT.verify(token, JWT_SECRET);
        const storeOwner = await StoreOwner.findById(payload.sub);
        if (!storeOwner) {
            return next(ApiError.Unauthorized('You don\'t have an account'));
        }
        else if (storeOwner.local.verified){
            return res.status(200).send('This account has been already verified. Please log in.');
    
        }
        else{
            const mailOptions = { 
                from: EMAIL.USER, 
                to: storeOwner.local.email, 
                subject: 'Account Verification', 
                text: 'Hello '+ storeOwner.local.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/storeOwner\/confirmation\/' + storeOwner.local.email + '\/' + token + '\n\nThank You!\n' 
            };
    
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                    }
                return res.status(200).send('A verification email has been sent to ' + storeOwner.local.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
            });
        }
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
