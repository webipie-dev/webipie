const express = require('express');
const Client = require('../models/client');
const router = express.Router();
const ClientService = require('../services/client')

// getClients
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


//getManyClients
/**
 * @swagger
 * /client/many:
 *  get:
 *    description: Use to request many client
 *    parameters:
 *       - in: path
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *         required: true
 *         description: unique IDs of the clients to get
 *    responses:
 *      '200':
 *        content:  # Response body
 *          application/json:  # Media type
 *           schema: 
 *             $ref: '#/components/schemas/ArrayOfClients'    # Reference to object definition
 */
router.get('/many', ClientService.getManyClientById)


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
router.get('/:_id', ClientService.getOneClient)

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
router.post('', ClientService.addClient)


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
router.patch('/update', ClientService.editClient)

module.exports = router;
