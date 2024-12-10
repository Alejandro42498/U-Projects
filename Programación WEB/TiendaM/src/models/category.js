// src/models/category.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Product from './product.js';

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relación uno a muchos
Category.hasMany(Product, { as: 'Products', foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

export default Category;
