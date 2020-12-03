const express = require('express');
const router = express.Router();
const OrderService = require('../services/order');

// getOrders
router.get('', OrderService.getOrders)

//getManyOrders
router.get('/many', OrderService.getManyOrderById)

// getOrderbyId
router.get('/:_id', OrderService.getOneOrder)


// router.get('/detail/:_id', OrderService.detailOrder)

// addOrder
router.post('', OrderService.addOrder)


// deleteManyOrders
router.delete('', OrderService.deleteManyOrders)

//deleteAllOrders
router.delete('/delete', OrderService.deleteAllOrders)

//delete Products From an Order
router.delete('/delete/product', OrderService.deleteProductOrder)


//edit Orders
router.patch('/update', OrderService.editOrder)



module.exports = router;
