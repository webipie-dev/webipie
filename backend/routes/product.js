const express = require('express');
const router = express.Router();
const productService = require('../services/product');
const multer = require('multer');
const clearCache = require('../middlewares/caching/clearCache');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const productValidator = require("../middlewares/validation/product-validator");
const passportJWT = passport.authenticate('jwt', { session: false });

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  }
});

//get all products
/**
 * @swagger
 * /product:
 *  get:
 *    description: Use to request all products
 *    tags:
 *      - products
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
 *              imgs:
 *                  type: array
 *              price:
 *                  type: number
 *              store:
 *                  type: string
 *                  format: uuid
 *
 *      ArrayOfProducts:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                imgs:
 *                  type: array
 *                price:
 *                  type: number
 *                store:
 *                  type: string
 *                  format: uuid
 *
 */
router.get('', passportJWT, productService.getProducts)

//getManyProducts
/**
 * @swagger
 * /product/many:
 *  get:
 *    description: Use to request many products
 *    tags:
 *      - products
 *    parameters:
 *       - in: path
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *         required: true
 *         description: unique IDs of the products to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfProducts'    # Reference to object definition
 */
// router.get('/many', productService.getManyProductById)

// getProductbyId
/**
 * @swagger
 * /product/{id}:
 *  get:
 *    description: Use to request one product by id
 *    tags:
 *      - products
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the product to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Product'    # Reference to object definition
 */
router.get('/:id', [
  validation.id
], validateRequest, productService.getOneProduct)

// addProduct
/**
 * @swagger
 * /product:
 *  post:
 *    description: Use to add one product
 *    tags:
 *      - products
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Product'    # Reference to object definition
 */
router.post('', [
  // validation.storeId,
  // productValidator.price,
  // productValidator.quantity,
  // productValidator.description,
  // productValidator.name,
], validateRequest, passportJWT, multer({storage: storage}).any("productImgs", 5), clearCache, productService.addProduct)


// deleteManyProducts
/**
 * @swagger
 * /product:
 *  delete:
 *    description: Use to delete one product or many
 *    tags:
 *      - products
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ids:
 *                  type: array
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/Product'
 *                  - $ref: '#/components/schemas/ArrayOfProducts'
 */
router.delete('', validation.ids, passportJWT, productService.deleteManyProducts)

//deleteAllProducts
/**
 * @swagger
 * /product/delete:
 *  delete:
 *    description: Use to delete all products
 *    tags:
 *      - products
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfProducts'    # Reference to object definition
 */
router.delete('/delete', passportJWT, productService.deleteAllProducts);


router.patch('/:id', [
  validation.id
], validateRequest, passportJWT, multer({storage: storage}).any("productImgs", 5), productService.editOneProduct)


module.exports = router;

