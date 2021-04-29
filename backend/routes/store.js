const express = require('express');
const router = express.Router();
const StoreService = require('../services/store')
const multer = require('multer');

const passport = require('passport');
const validation = require("../middlewares/validation/validator");
const validateRequest = require("../middlewares/validate-request");
const storeValidation = require("../middlewares/validation/store-validator");
const passportJWT = passport.authenticate('jwt', { session: false });

// getStores
router.get('', StoreService.getStores)

// getStorebyId
router.get('/:id', [
  validation.id
], validateRequest, StoreService.getOneStore);

router.get('/url/:url', StoreService.getStoreByUrl);

router.get('/all/names', StoreService.getStoreNames);

router.get('/all/urls', StoreService.getStoreUrls);

// addStore
router.post('', [
  storeValidation.name,
  // storeValidation.description,
  storeValidation.templateId,
  storeValidation.storeType,
], validateRequest, passportJWT, StoreService.addStore)

// deleteStore
// router.delete('/delete/single', StoreService.deleteOneStore);

// deleteAllStores
router.delete('/delete', StoreService.deleteAllStores)

router.patch('/:id', [
  validation.id
], validateRequest, passportJWT, StoreService.editStore)

//router.patch('/change-template/:id', StoreService.changeTemplate)

module.exports = router;
