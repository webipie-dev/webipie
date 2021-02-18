// GET
/**
 * @swagger
 * /template:
 *  get:
 *    description: Use to request all Templates
 *    tags:
 *      - Template
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 * components:
 *  schemas:
 *      Template:      # Object definition
 *          type: object
 *          properties:
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
 * /template/{id}:
 *  get:
 *    description: Use to request one template by id
 *    tags:
 *      - Template
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: unique ID of the template to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 */

// POST
/**
 * @swagger
 * /template:
 *  post:
 *    description: Use to add one template
 *    tags:
 *      - Template
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  header:
 *                      type: object
 *                      example: {img: http://localhost:3000/backend/images/carbon.png, title: tata, description: tata, mainButton: tata }
 *                  colorChart:
 *                      type: object
 *                  colorChartOptions:
 *                      type: array
 *                      example: ['aa','bb']
 *                  font:
 *                      type: string
 *                  fontOptions:
 *                      type: array
 *                      example: ['aa','bb']
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Template'    # Reference to object definition
 */

// DELETE
/**
 * @swagger
 * /template:
 *  delete:
 *    description: Use to delete one template or many
 *    tags:
 *      - Template
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
 * /template/{id}:
 *  patch:
 *    description: Use to edit one template
 *    tags:
 *      - Template
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the template to edit
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              example: {font: Monsserat, name: 'name one'}
 */

