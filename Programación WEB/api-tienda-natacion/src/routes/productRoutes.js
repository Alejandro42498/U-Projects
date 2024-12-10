const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById, // Asegúrate de importar esta función
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

// Ruta para obtener un producto específico por su ID
router.get('/:id', getProductById);

// Ruta para crear un producto
router.post('/', createProduct);

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para actualizar un producto
router.put('/:id', updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', deleteProduct);

module.exports = router;
