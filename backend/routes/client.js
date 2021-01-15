const express = require('express');
const Client = require('../models/client');
const router = express.Router();
const ClientService = require('../services/client')

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
<<<<<<< HEAD
 *           schema: 
 *             $ref: '#/components/schemas/ArrayOfClients'    # Reference to object definition
=======
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfClient'    # Reference to object definition
>>>>>>> 059d40beaddab2d1a32bb029007fbb5908ab75c3
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
 *    tags:
 *      - clients
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
// router.get('/many', ClientService.getManyClientById)


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
router.get('/:id', ClientService.getOneClient)

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
router.post('', ClientService.addClient)


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
router.delete('', ClientService.deleteManyClients)

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
router.delete('/delete', ClientService.deleteAllClients)

//updateManyClients
router.patch('/:id', ClientService.editClient)

module.exports = router;
