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
passportJWT.unless = require('express-unless');

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
router.get('', passportJWT.unless(function(req){
  if(req.headers['role'] === 'client'){
      return true;
  }
}), productService.getProducts)


//getManyProducts
router.get('/many', productService.getManyProductById)

// getProductbyId
router.get('/:id', [
  validation.id
], validateRequest, productService.getOneProduct)

// addProduct
router.post('', passportJWT, multer({storage: storage}).any("productImgs", 5), [
  validation.storeId,
  productValidator.price,
  productValidator.quantity,
  productValidator.description,
  productValidator.name,
], validateRequest, productService.addProduct);

router.patch('/:id/review', productService.addReview);

router.patch('/:id/delete/image', passportJWT, [
  validation.id
], validateRequest, productService.deleteImage);

// deleteManyProducts
router.delete('', validation.ids, passportJWT, productService.deleteManyProducts);

//deleteAllProducts
router.delete('/delete', passportJWT, productService.deleteAllProducts);


router.patch('/:id', passportJWT, multer({storage: storage}).any("productImgs", 5), [
  validation.id
], validateRequest ,clearCache, productService.editOneProduct)


module.exports = router;

