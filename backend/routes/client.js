const express = require('express');
const multer = require('multer');

const router = express.Router();
const ClientService = require('../services/client');
const validateRequest = require('../middlewares/validate-request')
const clearCache = require('../middlewares/caching/clearCache');


const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// validation rules specific to the client
const clientValidation = require('../middlewares/validation/client-validator');
// general validation rules
const validation = require('../middlewares/validation/validator');

passportJWT.unless = require('express-unless');
// passportJWT.use(static.unless({ method: 'OPTIONS' }));

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
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  }
});

// filerClients
router.get('', ClientService.getClients)


// getClientbyId
router.get('/:id', [validation.id], validateRequest, passportJWT.unless(function(req){
    if(req.headers['role'] === 'client'){
        return true;
    }
}), ClientService.getOneClient)


// addClient
router.post('', multer({storage: storage}).any(), [
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
