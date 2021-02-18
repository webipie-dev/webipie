// GET
/**
 * @swagger
 * /store:
 *  get:
 *    description: Use to request all Stores
 *    tags:
 *      - Store
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Store'    # Reference to object definition
 * components:
 *  schemas:
 *      Store:      # Object definition
 *          type: object
 *          properties:
 *              _id:
 *                  type: uuid
 *              name:
 *                  type: string
 *              storeType:
 *                  type: string
 *              description:
 *                  type: string
 *              logo:
 *                  type: array
 *                  items:
 *                      type: string
 *                      example: http://localhost:3000/backend/images/carbon.png
 *              creationData:
 *                  type: string
 *                  format: date
 *              contact:
 *                  type: object
 *                  properties:
 *                      phoneNumber:
 *                          type: string
 *                      email:
 *                          type: string
 *                      facebookPage:
 *                          type: string
 *                      instagramPage:
 *                          type: string
 *                      location:
 *                          type: string
 *              template:
 *                  type: object
 *                  properties:
 *                      _id:
 *                         type: string
 *                         format: uuid
 *                      name:
 *                          type: string
 *                      header:
 *                          type: object
 *                          example: {img: http://localhost:3000/backend/images/carbon.png, title: tata, description: tata, mainButton: tata }
 *                      colorChart:
 *                          type: object
 *                      colorChartOptions:
 *                          type: array
 *                          example: ['aa','bb']
 *                      font:
 *                          type: string
 *                      fontOptions:
 *                          type: array
 *                          example: ['aa','bb']
 *
 *
 *
 * /store/{id}:
 *  get:
 *    description: Use to request one store by id
 *    tags:
 *      - Store
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: unique ID of the store to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Store'    # Reference to object definition
 */

// POST
/**
 * @swagger
 * /store:
 *  post:
 *    description: Use to add one store
 *    tags:
 *      - Store
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  storeType:
 *                      type: string
 *                  description:
 *                      type: string
 *                  logo:
 *                      type: string
 *                      example: http://localhost:3000/backend/images/carbon.png
 *                  contact:
 *                      type: object
 *                      properties:
 *                          phoneNumber:
 *                              type: string
 *                          email:
 *                              type: string
 *                          facebookPage:
 *                              type: string
 *                          instagramPage:
 *                              type: string
 *                          location:
 *                              type: string
 *                  templateId:
 *                      type: string
 *                      format: uuid
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Store'    # Reference to object definition
 */

// DELETE
/**
 * @swagger
 * /store:
 *  delete:
 *    description: Use to delete one store or many
 *    tags:
 *      - Store
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
 * /store/{id}:
 *  patch:
 *    description: Use to edit one store
 *    tags:
 *      - Store
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the store to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {'template.font': Monsserat, name: 'name one'}
 */

