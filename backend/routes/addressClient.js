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
router.delete('', AddressService.deleteManyAddresses)

// delete all addresses
router.delete('/delete', AddressService.deleteAllAddresses)

module.exports = router;
