const express = require('express');
const Client = require('../models/client');
const router = express.Router();
const mongoose = require('mongoose');
const ClientService = require('../services/client')

// getClients
router.get('', ClientService.getClients)

// getClientbyId
router.get('/:_id', ClientService.getOneClient)

// addClient
router.post('', ClientService.addClient)

// deleteCLient
router.delete('/:_id', ClientService.deleteClient)

module.exports = router;
