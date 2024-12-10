import { DataTypes } from 'sequelize';  // Usar import en lugar de require
import { sequelize } from '../config/database.js';  // Usar import en lugar de require

const Order = sequelize.define('Order', {
  customerName: { type: DataTypes.STRING, allowNull: false },
  customerAddress: { type: DataTypes.STRING, allowNull: false },
  customerPhone: { type: DataTypes.STRING, allowNull: false },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
});

export default Order;  // Usar export default en lugar de module.exports
