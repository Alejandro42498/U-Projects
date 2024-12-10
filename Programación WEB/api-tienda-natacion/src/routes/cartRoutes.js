const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('../controllers/cartController');
const authenticate = require('../middlewares/authMiddleware');

// Ruta para agregar un producto al carrito
router.post('/', authenticate, addToCart);

// Ruta para obtener los productos del carrito
router.get('/', authenticate, getCartItems);

// Ruta para eliminar un producto del carrito
router.delete('/:id', authenticate, removeFromCart);

module.exports = router;
