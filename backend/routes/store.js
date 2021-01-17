const express = require('express');
const router = express.Router();
const StoreService = require('../services/store')
const multer = require('multer');

const passport = require('passport');
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
    let destFile = 'backend/images/';
    if(file.fieldname === 'headerImg') {
      destFile = destFile + 'headerImgs'
    } else if(file.fieldname === 'logoImg') {
      destFile = destFile + 'logoImgs'
    }
    cb(error, destFile);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  }
});

// getStores
/**
 * @swagger
 * /store:
 *  get:
 *    description: Use to request all stores by admin
 *    tags:
 *      - store
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfStores'    # Reference to object definition
 * components:
 *  schemas:
 *      Store:      # Object definition
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              name:
 *                  type: string
 *              logo:
 *                  type: string
 *                  format: byte
 *              description:
 *                  type: string
 *              storeType:
 *                  type: string
 *              location:
 *                  type: string
 *              creationDate:
 *                  type: string
 *                  format: date
 *
 *      ArrayOfStores:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                logo:
 *                  type: string
 *                  format: byte
 *                description:
 *                  type: string
 *                storeType:
 *                  type: string
 *                location:
 *                  type: string
 *                creationDate:
 *                  type: string
 *                  format: date
 *
 */
router.get('', StoreService.getStores)

// getStorebyId
/**
 * @swagger
 * /store/{id}:
 *  get:
 *    description: Use to request one store by id
 *    tags:
 *      - store
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the store to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Store'    # Reference to object definition
 */
router.get('/:id', StoreService.getOneStore)

// addStore
/**
 * @swagger
 * /store:
 *  post:
 *    description: Use to add one store once the use is logged in
 *    tags:
 *      - store
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Store'    # Reference to object definition
 */
router.post('', passportJWT, multer({storage: storage}).single('logoImg'), StoreService.addStore)

// deleteStore
/**
 * @swagger
 * /store/delete/single:
 *  delete:
 *    description: Use to delete user's store
 *    tags:
 *      - store
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ids:
 *                  type: string
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *              schema:
 *                  $ref: '#/components/schemas/Store'
 */
// router.delete('/delete/single', StoreService.deleteOneStore);

// deleteAllStores
/**
 * @swagger
 * /store/delete:
 *  delete:
 *    description: Use to delete one all stores by admin
 *    tags:
 *      - store
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *              schema:
 *                  $ref: '#/components/schemas/Store'
 */
router.delete('/delete', StoreService.deleteAllStores)

router.patch('/:id', passportJWT, multer({storage: storage}).any(), StoreService.editStore)


module.exports = router;
