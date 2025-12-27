const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// router.get('/', verifyToken, isAdmin, userController.getAllUsers);
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);

module.exports = router;
