const express = require('express');
const Client = require('../models/client');
const router = express.Router();
const ClientService = require('../services/client')

// getClients
router.get('', ClientService.getClients)


//getManyClients
router.get('/many', ClientService.getManyClientById)


// getClientbyId
router.get('/:_id', ClientService.getOneClient)

// addClient
router.post('', ClientService.addClient)


// deleteManyCLients
router.delete('', ClientService.deleteManyClients)

//deleteAllClients
router.delete('/delete', ClientService.deleteAllClients)

//updateManyClients
router.patch('/update', ClientService.editClient)

module.exports = router;
