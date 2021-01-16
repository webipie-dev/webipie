const util = require('util');
const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const { check }  = require('express-validator');

let validation = {
    /**
    Must pass the following rules:
        is not an empty string
        must not contain any numbers
        is a minimum of 2 characters long
        is under 30 characters long
    */
    firstName: util.promisify(
        check('firstname')
            .not().isEmpty().withMessage('Provide your real name')
            .isAlpha().withMessage('Name must not contain numbers')
            .isLength({ min: 2 }).withMessage('First name is too short.')
            .isLength({ max: 30 }).withMessage('First name is too long.')
    ),

    /**
    Must pass the following rules:
        is not an empty string
        must not contain any numbers
        is a minimum of 2 characters long
        is under 50 characters long
     */
    lastName: util.promisify(
        check('lastname')
            .not().isEmpty().withMessage('Provide your real name')
            .isAlpha().withMessage('Name must not contain numbers')
            .isLength({ min: 2 }).withMessage('Last name is too short.')
            .isLength({ max: 50 }).withMessage('Last name is too long.')
    ),

    /**
    Must pass the following rules:
        is not an empty number
        is a minimum of 8 caharacters long
    */
    phoneNumber: util.promisify(
        check('phoneNumber')
            .not().isEmpty().withMessage('phoneNumber can\'t be empty.')
            .isNumeric()
            .isLength({ min: 8, max: 8})
            .withMessage('PhoneNumber must be a 8 length number')
    ),

    /**
    Must pass the following rules:
        is not an empty string
        is a valid email address (must contain '@' and address domain suffix (.com, .net ...)
        is under 256 characters long
        is unique (doesn't exist in the database)
    */
   email: util.promisify(
    check('email')
        .not().isEmpty().withMessage('Email can\'t be empty.')
        .isEmail().withMessage('Invalid e-mail address.')
        .isLength({ max: 256 }).withMessage('Email is too long.')
        .custom(value => {
            return Client.findOne({ "email": value }).then(user => {
                if(user)
                    return Promise.reject('E-mail already in use');
            })
        })
),
};

module.exports = validation;