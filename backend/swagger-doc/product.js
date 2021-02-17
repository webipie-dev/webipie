// GET
/**
 * @swagger
 * /product:
 *  get:
 *    description: Use to request all Products
 *    tags:
 *      - Product
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfProducts'    # Reference to object definition
 * components:
 *  schemas:
 *      Product:      # Object definition
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              paymentMethod:
 *                  type: string
 *              imgs:
 *                  type: array
 *                  items:
 *                      type: string
 *                      example: http://localhost:3000/backend/images/carbon.png
 *              price:
 *                  type: number
 *              quantity:
 *                  type: integer
 *              popular:
 *                  type: boolean
 *              openReview:
 *                  type: boolean
 *              reviews:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      review:
 *                          type: string
 *                      rating:
 *                          type: string
 *                      date:
 *                          type: string
 *                          format: date
 *              store:
 *                 type: string
 *                 format: uuid
 *
 *      ArrayOfProducts:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  paymentMethod:
 *                      type: string
 *                  imgs:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: http://localhost:3000/backend/images/carbon.png
 *                  price:
 *                      type: number
 *                  quantity:
 *                      type: integer
 *                  popular:
 *                      type: boolean
 *                  openReview:
 *                      type: boolean
 *                  reviews:
 *                      type: object
 *                      properties:
 *                        name:
 *                            type: string
 *                        email:
 *                            type: string
 *                        review:
 *                            type: string
 *                        rating:
 *                            type: string
 *                        date:
 *                            type: string
 *                            format: date
 *                  store:
 *                      type: string
 *                      format: uuid
 *
 * /product/{id}:
 *  get:
 *    description: Use to request one product by id
 *    tags:
 *      - Product
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: unique ID of the product to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Product'    # Reference to object definition
 */

// POST
/**
 * @swagger
 * /product:
 *  post:
 *    description: Use to add one product
 *    tags:
 *      - Product
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  paymentMethod:
 *                      type: string
 *                  imgs:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: http://localhost:3000/backend/images/carbon.png
 *                  price:
 *                      type: number
 *                  quantity:
 *                      type: integer
 *                  popular:
 *                     type: string
 *                     example: 'false'
 *                  openReview:
 *                      type: string
 *                      example: 'true'
 *                  storeId:
 *                    type: string
 *                    format: uuid
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Product'    # Reference to object definition
 */

// DELETE
/**
 * @swagger
 * /product:
 *  delete:
 *    description: Use to delete one product or many
 *    tags:
 *      - Product
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
 * /product/{id}:
 *  patch:
 *    description: Use to edit one product
 *    tags:
 *      - Product
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the product to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {name: shirt, price: 50}
 *
 *
 * /product/{id}/review:
 *  patch:
 *    description: Use to add one review
 *    tags:
 *      - Product
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the product to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {name: ahmed, email: test@test.com, rating: "5", data: 20/2/2021}
 *
 * /product/{id}/delete/image:
 *  patch:
 *    description: Use to add one review
 *    tags:
 *      - Product
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the product to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {url: http://localhost:3000/backend/images/image.png}
 */

