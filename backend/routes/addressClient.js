const express = require('express');
const router = express.Router();
const AddressService = require('../services/addressClient')

// getAddresses
router.get('', AddressService.getAddresses)

// getAddressById
router.get('/:_id', AddressService.getOneAddress)

// addAddress
router.post('', AddressService.addAddress)

// deleteAddress
router.delete('/:_id', AddressService.deleteAddress)

module.exports = router;
