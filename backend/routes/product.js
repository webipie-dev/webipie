const express = require('express');
const router = express.Router();
const productService = require('../services/product');
const Store = require('../models/store');
const clearCache = require('../middlewares/caching/clearCache');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const productValidator = require("../middlewares/validation/product-validator");
const passportJWT = passport.authenticate('jwt', { session: false });
passportJWT.unless = require('express-unless');





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
router.post('', passportJWT, productService.addProduct);

router.patch('/:id/review', productService.addReview);

router.patch('/:id/delete/image', passportJWT, [
  validation.id
], validateRequest, productService.deleteImage);

// deleteManyProducts
router.delete('', validation.ids, passportJWT, productService.deleteManyProducts);

//deleteAllProducts
router.delete('/delete', passportJWT, productService.deleteAllProducts);


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest ,clearCache, productService.editOneProduct)


module.exports = router;

