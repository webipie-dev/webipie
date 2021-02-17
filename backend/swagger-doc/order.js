// GET
/**
 * @swagger
 * /order:
 *  get:
 *    description: Use to request all Orders
 *    tags:
 *      - Order
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
 *                  type: string
 *                  format: uuid
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
 *                              type: array
 *                              items:
 *                                    type: string
 *                                    example: http://localhost:3000/backend/images/carbon.png
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
 *                      type: string
 *                      format: uuid
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
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                      example: http://localhost:3000/backend/images/carbon.png
 *
 * /order/{id}:
 *  get:
 *    description: Use to request one order by id
 *    tags:
 *      - Order
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

// POST
/**
 * @swagger
 * /order:
 *  post:
 *    description: Use to add one order
 *    tags:
 *      - Order
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  storeId:
 *                      type: string
 *                      format: uuid
 *                  orderDate:
 *                      type: string
 *                      format: date
 *                  orderStatus:
 *                      type: string
 *                  paymentMethod:
 *                      type: string
 *                  clientId:
 *                      type: string
 *                      format: uuid
 *                  productsOrder:
 *                      type: object
 *                      properties:
 *                          ids:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: uuid
 *                          products:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          format: uuid
 *                                      name:
 *                                          type: string
 *                                      quantity:
 *                                          type: integer
 *
 *                                      price:
 *                                          type: number
 *                                      imgs:
 *                                          type: array
 *                                          items:
 *                                              type: string
 *                                              example: http://localhost:3000/backend/images/carbon.png
 *

 *
 *
 *
 *
 *
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Order'    # Reference to object definition
 */

// DELETE
/**
 * @swagger
 * /order:
 *  delete:
 *    description: Use to delete one order or many
 *    tags:
 *      - Order
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  ids:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: uuid
 */


// UPDATE
/**
 * @swagger
 * /order/{id}:
 *  patch:
 *    description: Use to edit one order
 *    tags:
 *      - Order
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the order to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {orderStatus: Complete}
 */

