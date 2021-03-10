const util = require('util');
const mongoose = require('mongoose')
const { check }  = require('express-validator');

let storeValidation = {
  /**
   Must pass the following rules:
   is not an empty string
   is a minimum of 2 characters long
   is under 30 characters long
   */
  name: util.promisify(
    check('name')
      .not().isEmpty().withMessage('Name not provided')
      .isLength({ min: 2 ,max :30}).withMessage('name is too short or too long')
  ),

  /**
   Must pass the following rules:
   is not an empty string
   is a minimum of 2 characters long
   is under 50 characters long
   */
  description: util.promisify(
    check('description')
      .not().isEmpty().withMessage('Description not provided')
      .isLength({ min: 2, max: 50 }).withMessage('Description is too short or too long')
  ),

  /**
   Must pass the following rules:
   is not an empty string
   */
  storeType: util.promisify(
    check('storeType')
      .not().isEmpty().withMessage('storeType not provided')
  ),


  /**
   Must pass the following rules:
   is a mongoose Id
   */
  templateId: util.promisify(
    check('templateId')
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('templateId must be valid')
  )
};

module.exports = storeValidation;
