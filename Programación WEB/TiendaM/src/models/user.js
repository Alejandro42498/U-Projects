import { Model, DataTypes } from 'sequelize';  // Usar import en lugar de require
import { sequelize } from '../config/database.js';  // Usar import en lugar de require

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  sequelize,
  modelName: 'User'
});

export default User;  // Usar export default en lugar de module.exports
