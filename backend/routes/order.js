const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OrderService = require('../services/order');
// const router = require('express-promise-router')();

// getOrders
router.get('', OrderService.getOrders)

// getOrderbyId
router.get('/:_id', OrderService.getOneOrder)


router.get('/detail/:_id', OrderService.detailOrder)

// addOrder
router.post('', OrderService.addOrder)


// deleteManyOrders
router.delete('', OrderService.deleteManyOrders)

//deleteAllOrders
router.delete('/delete', OrderService.deleteAllOrders)

router.patch('/update', OrderService.editOrder)



module.exports = router;
