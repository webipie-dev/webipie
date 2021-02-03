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
/**
 * @swagger
 * /order:
 *  get:
 *    description: Use to request all orders
 *    tags:
 *      - orders
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfOrders'    # Reference to object definition
 * components:
 *  schemas:
 *      Order:      # Object definition
 *          type: object
 *          properties:
 *              orderDate:
 *                  type: string
 *                  format: date
 *              orderStatus:
 *                  type: string
 *              paymentMethod:
 *                  type: string
 *              client:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          format: uuid
 *                      name:
 *                          type: string
 *              store:
 *                  type: string
 *                  format: uuid
 *              products:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          name:
 *                              type: string
 *                          quantity:
 *                              type: integer
 *                          price:
 *                              type: number
 *                          imgs:
 *                              type: string
 *                              format: byte
 *
 *      ArrayOfOrders:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  orderDate:
 *                      type: string
 *                      format: date
 *                  orderStatus:
 *                      type: string
 *                  paymentMethod:
 *                      type: string
 *                  client:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              format: uuid
 *                          name:
 *                              type: string
 *                  store:
 *                      type: string
 *                      format: uuid
 *                  products:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              quantity:
 *                                  type: integer
 *                              price:
 *                                  type: number
 *                              imgs:
 *                                  type: string
 *                                  format: byte
 *
 */
router.get('', passportJWT, OrderService.getOrders)

// getOrderbyId
/**
 * @swagger
 * /order/{id}:
 *  get:
 *    description: Use to request one order by id
 *    tags:
 *      - orders
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: unique ID of the order to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Order'    # Reference to object definition
 */
router.get('/:id', [
  validation.id
], validateRequest, passportJWT, OrderService.getOneOrder)


// addOrder
/**
 * @swagger
 * /order:
 *  post:
 *    description: Use to add one order
 *    tags:
 *      - orders
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Order'    # Reference to object definition
 */
router.post('', [
  orderValidation.orderStatus,
  orderValidation.ids,
  orderValidation.productsOrder,
  orderValidation.productId,
  orderValidation.clientId,
  validation.storeId
], validateRequest, passportJWT, clearCache, OrderService.addOrder)


// deleteManyOrders
/**
 * @swagger
 * /order:
 *  delete:
 *    description: Use to delete one order or many
 *    tags:
 *      - orders
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ids:
 *                  type: array
 *                  items:
 *                      name: id
 *                      type: string
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *              schema:
 *                  oneOf:
 *                      - $ref: '#/components/schemas/Order'
 *                      - $ref: '#/components/schemas/ArrayOfOrders'
 */
router.delete('', validation.ids, passportJWT, validateRequest, clearCache, OrderService.deleteManyOrders)

//deleteAllOrders
/**
 * @swagger
 * /order/delete:
 *  delete:
 *    description: Use to delete all orders
 *    tags:
 *      - orders
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfOrders'    # Reference to object definition
 */
router.delete('/delete', passportJWT, clearCache, OrderService.deleteAllOrders)

//delete Products From an Order
/**
 * @swagger
 * /order/delete/product:
 *  delete:
 *    description: Use to delete products from order
 *    tags:
 *      - orders
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             id:
 *               type: string
 *             product:
 *               type: string
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Order'    # Reference to object definition
 */
router.delete('/delete/product', [
  validation.id,
  orderValidation.product
], validateRequest, passportJWT, clearCache, OrderService.deleteProductOrder)


//edit Orders
router.patch('/:id', [
  validation.id
], validateRequest, passportJWT, clearCache, OrderService.editOrder)


module.exports = router;
