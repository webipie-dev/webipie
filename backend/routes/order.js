const express = require('express');
const router = express.Router();
const OrderService = require('../services/order');
const clearCache = require('../middlewares/caching/clearCache');


// general validation rules
const validation = require('../middlewares/validation/validator');
const orderValidation = require('../middlewares/validation/order-validator');

const validateRequest = require("../middlewares/validate-request");


const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// getOrders
router.get('', passportJWT, OrderService.getOrders)

// getOrderbyId
router.get('/:id', [
  validation.id
], validateRequest, passportJWT, OrderService.getOneOrder)


// addOrder
router.post('', [
  orderValidation.ids,
  orderValidation.productsOrder,
  // orderValidation.productId,
  orderValidation.clientId,
  validation.storeId
], validateRequest, OrderService.addOrder)


// deleteManyOrders
router.delete('', validation.ids, passportJWT, validateRequest, OrderService.deleteManyOrders)

//deleteAllOrders
router.delete('/delete', passportJWT, OrderService.deleteAllOrders)

//delete Products From an Order
router.delete('/delete/product', [
  validation.id,
  orderValidation.product
], validateRequest, passportJWT, OrderService.deleteProductOrder)


//edit Orders
router.patch('/:id', [
  validation.id
], validateRequest, passportJWT, OrderService.editOrder)


router.patch('/refund/products', passportJWT, OrderService.refundProducts)

module.exports = router;
