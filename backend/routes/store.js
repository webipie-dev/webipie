const express = require('express');
const router = express.Router();
const StoreService = require('../services/store')
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

router.get('', StoreService.getStores)

router.get('/:id', StoreService.getOneStore)

router.post('',multer({storage: storage}).single('logoImg'), StoreService.addStore)

router.delete('', StoreService.deleteManyStores)

router.delete('/delete', StoreService.deleteAllStores)

router.patch('/:id',multer({storage: storage}).any(), StoreService.editStore)


module.exports = router;
