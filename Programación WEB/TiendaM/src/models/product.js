import { DataTypes } from 'sequelize';  // Usar import en lugar de require
import { sequelize } from '../config/database.js';  // Usar import en lugar de require
import Category from './category.js';  // Usar import en lugar de require

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
});

// Establecer las relaciones entre productos y categorías
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

export default Product;  // Usar export default en lugar de module.exports
