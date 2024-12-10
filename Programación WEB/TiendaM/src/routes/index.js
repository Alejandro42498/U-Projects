import express from 'express';
import Category from '../models/category.js'; 
import productController from '../controllers/productController.js'; 

const router = express.Router();

// Ruta para obtener categorías
router.get('/', async (req, res) => {
  try {
    // Obtén las categorías desde la base de datos
    const categories = await Category.findAll();
    // Pasa la variable `categories` a la vista
    res.render('client/index', { categories });
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).send('Error del servidor');
  }
});

// Controladores y rutas públicas
router.get('/', (req, res) => {
  // Pasa `user` a la vista para que esté disponible en `navbar.ejs`
  res.render('client/index', { user: req.user });
});

// Ruta para listar productos
router.get('/products', productController.listProducts);

// Ruta para el carrito de compras
router.get('/shopping-cart', productController.shoppingCart);

export default router; // Usa export default en lugar de module.exports
