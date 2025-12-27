const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin Routes (Protected)
// router.post('/', verifyToken, isAdmin, upload.single('image'), productController.createProduct);
// router.put('/:id', verifyToken, isAdmin, upload.single('image'), productController.updateProduct);
// router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

// Unprotected for easier testing/demo as per user context
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
