// GET
/**
 * @swagger
 * /client:
 *  get:
 *    description: Use to Request All Clients Related to a Specific Store and Filter with Fields
 *    tags:
 *      - Client
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfClients'    # Reference to object definition
 * components:
 *  schemas:
 *      Client:      # Object definition
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              store:
 *                   type: string
 *                   format: uuid
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              phoneNumber:
 *                  type: string
 *              email:
 *                  type: string
 *              fullAddress:
 *                  type: object
 *                  properties:
 *                      street:
 *                          type: string
 *                      city:
 *                          type: string
 *                      state:
 *                          type: string
 *                      zipCode:
 *                          type: string
 *
 *
 *
 *      ArrayOfClients:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  store:
 *                      type: string
 *                      format: uuid
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phoneNumber:
 *                      type: string
 *                  fullAddress:
 *                      type: object
 *                      properties:
 *                          street:
 *                              type: string
 *                          city:
 *                              type: string
 *                          state:
 *                              type: string
 *                          zipCode:
 *                              type: string
 *
 * /client/{id}:
 *  get:
 *    description: Use to request one client by id
 *    tags:
 *      - Client
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the client to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Client'    # Reference to object definition
 *
 */

// POST
/**
 * @swagger
 * /client:
 *  post:
 *    description: Use to add one client
 *    tags:
 *      - Client
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
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  phoneNumber:
 *                      type: string
 *                  email:
 *                      type: string
 *                  fullAddress:
 *                      type: string
 *                      example: 15 rue de lib, bj, ariana, 2073
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Client'    # Reference to object definition
 */

// DELETE
/**
 * @swagger
 * /client:
 *  delete:
 *    description: Use to delete one client or many
 *    tags:
 *      - Client
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
 * /client/{id}:
 *  patch:
 *    description: Use to edit one client
 *    tags:
 *      - Client
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the client to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {firstname: kaka, lastname: ricardo, address: '20 rue de marseille, tn, tunis, 1464'}
 */

