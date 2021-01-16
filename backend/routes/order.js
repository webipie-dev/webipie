const express = require('express');
const router = express.Router();
const OrderService = require('../services/order');

// getOrders
/**
 * @swagger
 * /order:
 *  get:
 *    description: Use to request all orders
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
router.get('', OrderService.getOrders)

//getManyOrders
/**
 * @swagger
 * /order/many:
 *  get:
 *    description: Use to request many orders
 *    parameters:
 *       - in: path
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *         required: true
 *         description: unique ID of the order to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfOrders'    # Reference to object definition
 */
// router.get('/many', OrderService.getManyOrderById)

// getOrderbyId
/**
 * @swagger
 * /order/{id}:
 *  get:
 *    description: Use to request one order by id
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
router.get('/:id', OrderService.getOneOrder)


// router.get('/detail/:_id', OrderService.detailOrder)

// addOrder
/**
 * @swagger
 * /client:
 *  post:
 *    description: Use to add one order
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
router.post('', OrderService.addOrder)


// deleteManyOrders
/**
 * @swagger
 * /order:
 *  delete:
 *    description: Use to delete one order or many
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
router.delete('', OrderService.deleteManyOrders)

//deleteAllOrders
/**
 * @swagger
 * /order/delete:
 *  delete:
 *    description: Use to delete all orders
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfOrders'    # Reference to object definition
 */
router.delete('/delete', OrderService.deleteAllOrders)

//delete Products From an Order
/**
 * @swagger
 * /order/delete/product:
 *  delete:
 *    description: Use to delete products from order
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
router.delete('/delete/product', OrderService.deleteProductOrder)


//edit Orders
router.patch('/:id', OrderService.editOrder)



module.exports = router;
