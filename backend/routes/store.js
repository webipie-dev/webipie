const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
    cb(error, "backend/images/logos");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

// getStores
router.get('', StoreService.getStores)

// getStorebyId
router.get('/:_id', StoreService.getOneStore)

// addStore
router.post('',multer({storage: storage}).single("logoImg"), StoreService.addStore)


// deleteManyStores
router.delete('', StoreService.deleteManyStores)

//deleteAllStores
router.delete('/delete', StoreService.deleteAllStores)


router.patch('/update',multer({storage: storage}).single("logoImg"), StoreService.editStore)

module.exports = router;
