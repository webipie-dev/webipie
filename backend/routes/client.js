const express = require('express');
const router = express.Router();
const ClientService = require('../services/client');
const { body, param } = require('express-validator');
const mongoose = require('mongoose')
const validateRequest = require('../middlewares/validate-request')

// filerClients
/**
 * @swagger
 * /client:
 *  get:
 *    description: Use to request all clients
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfClient'    # Reference to object definition
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
router.get('', ClientService.getClients)

// getClientbyId
/**
 * @swagger
 * /client/{id}:
 *  get:
 *    description: Use to request one client by id
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
router.get('/:id',[
  param('id')
    .not()
    .isEmpty()
    .custom((input) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('wrong clientId or none has been provided')
], validateRequest, ClientService.getOneClient)

// addClient
/**
 * @swagger
 * /client:
 *  post:
 *    description: Use to add one client
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
  body('storeId')
    .not()
    .isEmpty()
    .custom((input) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('wrong storeId or none has been provided'),
  body('phoneNumber').not().isEmpty().withMessage('Phone Number is required')
], validateRequest, ClientService.addClient)



// deleteManyCLients
/**
 * @swagger
 * /client:
 *  delete:
 *    description: Use to delete one client or many
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
router.delete('', ClientService.deleteManyClients)

//deleteAllClients
/**
 * @swagger
 * /client/delete:
 *  delete:
 *    description: Use to delete all clients
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfClients'    # Reference to object definition
 */
router.delete('/delete', ClientService.deleteAllClients)

//updateManyClients
router.patch('/:id', ClientService.editClient)

module.exports = router;
