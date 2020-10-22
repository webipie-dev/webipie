const express = require('express');
const router = express.Router();
const productService = require('../services/product');
const multer = require('multer');

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
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router
  .get('/', productService.getProducts)
  .get('/:productId', productService.getOneProduct)
  .post('/', multer({storage: storage}).array("productImgs", 5), productService.addProduct)
  .patch('/', multer({storage: storage}).array("productImgs", 5), productService.editProducts)
  .delete('/', productService.deleteManyProducts)
  .delete('/delete', productService.deleteAllProducts);

module.exports = router;

