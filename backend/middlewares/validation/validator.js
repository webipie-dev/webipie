const util = require('util')
const mongoose = require('mongoose')
const { check, body } = require('express-validator');


let validation = {
    /**
    Must pass the following rules:
        is not an empty string
        is a minimum of 8 caharacters long
        contains at least one uppercase letter
        contains at least one lowercase letter
        contains at least one digit
     */
    password: util.promisify(
        check('newPassword')
            .not().isEmpty().withMessage('Password can\'t be empty.')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
            .withMessage('Password must contain at least 8 characters, with one digit and at least one uppercase and lower case letter')
    ),
  /**
   Must pass the following rules:
   is not an empty string
   is a mongoose objectId
   */
    id: util.promisify(
      check('id')
        .not()
        .isEmpty()
        .custom((input) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('ID Must be Valid')
    ),

  /**
   Must pass the following rules:
   is not an empty array
   every element is a mongoose objectId
   */
    ids: util.promisify(
      check('ids')
        .not().isEmpty().withMessage('No ids provided'),
      check('ids.*')
        .custom((input) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('IDS must be valid')
    ),

  /**
   Must pass the following rules:
   is a mongoose Id
   */
  storeId: util.promisify(
    body('storeId')
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('storeId must be valid')
  )
};



module.exports = validation;
