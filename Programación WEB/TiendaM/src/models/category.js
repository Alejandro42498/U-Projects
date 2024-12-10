import { DataTypes } from 'sequelize';  // Usar import en lugar de require
import { sequelize } from '../config/database.js';  // Usar import en lugar de require

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export default Category;  // Usar export default en lugar de module.exports

