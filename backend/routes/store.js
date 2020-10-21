const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StoreService = require('../services/store')

// getStores
router.get('', StoreService.getStores)

// getStorebyId
router.get('/:_id', StoreService.getOneStore)

// addStore
router.post('', StoreService.addStore)


// deleteManyStores
router.delete('', StoreService.deleteManyStores)

//deleteAllStores
router.delete('/delete', StoreService.deleteAllStores)


router.patch('/update', StoreService.editStore)

module.exports = router;
