const express = require('express');
const multer = require('multer');

const router = express.Router();
const ClientService = require('../services/client');
const validateRequest = require('../middlewares/validate-request')

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// validation rules specific to the client
const clientValidation = require('../middlewares/validation/client-validator');
// general validation rules
const validation = require('../middlewares/validation/validator');

passportJWT.unless = require('express-unless');
// passportJWT.use(static.unless({ method: 'OPTIONS' }));


// filerClients
router.get('', ClientService.getClients)


// getClientbyId
router.get('/:id', [validation.id], validateRequest, passportJWT.unless(function(req){
    if(req.headers['role'] === 'client'){
        return true;
    }
}), ClientService.getOneClient)


// addClient
router.post('', [
    clientValidation.firstName,
    clientValidation.lastName,
    clientValidation.phoneNumber,
    validation.storeId,
  ], validateRequest, ClientService.addClient)


// deleteManyClients
router.delete('', validation.ids, validateRequest, passportJWT.unless(function(req){
    if(req.headers['role'] === 'client'){
        return true;
    }
}), ClientService.deleteManyClients)

//deleteAllClients
router.delete('/delete', passportJWT, ClientService.deleteAllClients)

//updateManyClients
router.patch('/:id', [
  validation.id
], validateRequest, ClientService.editClient)

module.exports = router;
