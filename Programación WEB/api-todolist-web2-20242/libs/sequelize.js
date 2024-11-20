import { Sequelize } from "sequelize";
import { defineModels } from "../db/models/index.js";

//const defineModels = (sequelize) => {  }

    export const sequelize = new Sequelize({

        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: '1',
        database: 'todos-web2-20242',
        dialect: 'postgres'
    });
defineModels(sequelize);
sequelize.sync() //usar solo en desarrollo, no en producción. 

    try {
await sequelize.authenticate();
console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
//export {defineModels};