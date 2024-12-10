import Product from '../models/product.js';
import Category from '../models/category.js';

export const listProducts = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.render('client/index', { categories });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error al obtener los productos');
  }
};

// Rutas adicionales
export const shoppingCart = (req, res) => {
  res.render('client/shoppingCart');
};

// Exportar todas las funciones
export default {
  listProducts,
  shoppingCart
};
