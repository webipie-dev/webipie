const util = require('util');
const { check }  = require('express-validator');

let productValidation = {
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
   is not an empty number
   is a max of 8 int long
   */
  price: util.promisify(
    check('price')
      .not().isEmpty().withMessage('price can\'t be empty.')
      .isNumeric()
      .isLength({ max: 8 })
      .withMessage('price is too high')
  ),

  /**
   Must pass the following rules:
   is not an empty string
   is a valid email address (must contain '@' and address domain suffix (.com, .net ...)
   is under 256 characters long
   */
  quantity: util.promisify(
    check('quantity')
      .not().isEmpty().withMessage('quantity can\'t be empty.')
      .isNumeric()
      .isLength({ max: 8 })
      .withMessage('quantity is too high')

  ),
};

module.exports = productValidation;
