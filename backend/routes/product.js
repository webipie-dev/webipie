const express = require('express');
const router = express.Router();
const productService = require('../services/product');

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

//search through products
router.get('/search/:searchTerm', productService.getSearch);

//getManyProducts
router.get('/many', productService.getManyProductById)

// getProductbyId
router.get('/:id', [
  validation.id
], validateRequest, productService.getOneProduct)

// addProduct
router.post('', passportJWT, [validation.storeId,
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


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , productService.editOneProduct)


module.exports = router;

