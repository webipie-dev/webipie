const util = require('util');
const { check, body }  = require('express-validator');
const mongoose = require('mongoose')


let validation = {
  /**
   Must pass the following rules:
   is not an empty string
   must not contain any numbers
   */
  orderStatus: util.promisify(
    check('orderStatus')
      .not().isEmpty().withMessage('OrderStatus not provided')
      .isAlpha().withMessage('OrderStatus must not contain numbers')
  ),



  /**
   Must pass the following rules:
   is not empty
   */
  productsOrder: util.promisify(
    check('productsOrder.ids')
      .not().isEmpty().withMessage('No products provided to add'),

  ),

  /**
   Must pass the following rules:
   has mongoose ids
   */
  ids: util.promisify(
    check('productsOrder.ids.*')
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('product ids must be valid'),

  ),

  /**
   Must pass the following rules:
   has mongoose ids
   */
  productId: util.promisify(
    check('productsOrder.products.*._id')
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('product _id must be valid'),
  ),

  /**
   Must pass the following rules:
   is mongoose id
   */
  clientId: util.promisify(
    check('clientId')
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('clientId must be valid'),
  ),

  /**
   Must pass the following rules:
   has mongoose ids
   */
  product: util.promisify(
    check('product.*')
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('product id must be valid'),
  ),

};


module.exports = validation;
