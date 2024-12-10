import { Sequelize } from 'sequelize';  // Usar import en lugar de require
import dotenv from 'dotenv';  // Asegúrate de importar dotenv

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

export { sequelize };  // Usar export en lugar de module.exports
