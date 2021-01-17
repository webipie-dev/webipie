const util = require('util');
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
            .isLength({ min: 2 ,max :30}).withMessage('First name is too short or too long')
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
            .isLength({ min: 2, max: 50 }).withMessage('Last name is too short or too long')
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
    */
   email: util.promisify(
    check('email')
        .not().isEmpty().withMessage('Email can\'t be empty.')
        .isEmail().withMessage('Invalid e-mail address.')
        .isLength({ max: 256 }).withMessage('Email is too long.')

),
};

module.exports = validation;
