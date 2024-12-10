import Product from './product.js';
import Category from './category.js';
import productController from '../controllers/productController.js';




// Establecer las relaciones entre productos y categorías
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

export {
  Product,
  Category,
};
