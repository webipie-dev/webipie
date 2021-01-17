const express = require('express');
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
/**
 * @swagger
 * /client:
 *  get:
 *    description: Use to request all clients
 *    tags:
 *      - clients
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfClients'    # Reference to object definition
 * components:
 *  schemas:
 *      Client:      # Object definition
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *              gender:
 *                  type: string
 *              fullAddress:
 *                  type: string
 *
 *      ArrayOfClients:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  gender:
 *                      type: string
 *                  fullAddress:
 *                      type: string
 *
 */
router.get('', passportJWT, ClientService.getClients)


// getClientbyId
/**
 * @swagger
 * /client/{id}:
 *  get:
 *    description: Use to request one client by id
 *    tags:
 *      - clients
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: unique ID of the client to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Client'    # Reference to object definition
 */


router.get('/:id', [validation.id], validateRequest, passportJWT.unless(function(req){
    if(req.headers['role'] === 'client'){
        return true;
    }
}), ClientService.getOneClient)


// addClient
/**
 * @swagger
 * /client:
 *  post:
 *    description: Use to add one client
 *    tags:
 *      - clients
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/Client'    # Reference to object definition
 */
router.post('', [
    clientValidation.firstName,
    clientValidation.lastName,
    clientValidation.phoneNumber,
    clientValidation.email
  ], validateRequest, ClientService.addClient)


// deleteManyCLients
/**
 * @swagger
 * /client:
 *  delete:
 *    description: Use to delete one client or many
 *    tags:
 *      - clients
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ids:
 *                  type: array
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *              schema:
 *                  $ref: '#/components/schemas/Client'
 */
router.delete('', validation.ids, validateRequest, passportJWT.unless(function(req){
    if(req.headers['role'] === 'client'){
        return true;
    }
}), ClientService.deleteManyClients)

//deleteAllClients
/**
 * @swagger
 * /client/delete:
 *  delete:
 *    description: Use to delete all clients
 *    tags:
 *      - clients
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfClients'    # Reference to object definition
 */
router.delete('/delete', passportJWT, ClientService.deleteAllClients)

//updateManyClients
router.patch('/:id', [
  validation.id
], validateRequest, ClientService.editClient)

module.exports = router;
