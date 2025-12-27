const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// router.get('/', verifyToken, isAdmin, orderController.getAllOrders);
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder); // NEW: Create Order
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;
