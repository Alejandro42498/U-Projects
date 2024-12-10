import express from 'express';
import Category from '../models/category.js'; 
import productController from '../controllers/productController.js'; 


const router = express.Router();

// Ruta principal: Obtener categorías y usuario
router.get('/', async (req, res) => {
  try {
    // Obtén las categorías desde la base de datos
    const categories = await Category.findAll();
    
    // Renderiza la vista principal y pasa las categorías y el usuario (si está autenticado)
    res.render('client/index', { categories, user: req.user });
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).send('Error del servidor');
  }
});

// Ruta para listar productos
router.get('/products', productController.listProducts);

// Ruta para el carrito de compras
//router.get('/shopping-cart', productController.shoppingCart);



export default router;
