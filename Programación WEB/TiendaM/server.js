import dotenv from 'dotenv';  // Usar import en lugar de require
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from './src/middlewares/passport.js';  // Asegúrate de la extensión .js
import { sequelize } from './src/config/database.js';  // Asegúrate de la extensión .js
import path from 'path';
import flash from 'connect-flash';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configuración del servidor
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));  // Usa __dirname para las rutas
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Rutas principales
import indexRoutes from './src/routes/index.js';
import authRoutes from './src/routes/auth.js';
import categoriesRoutes from './src/routes/categories.js';
import usersRoutes from './src/routes/users.js';
import productRoutes from './src/routes/products.js';

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/admin/categories', categoriesRoutes);
app.use('/admin/users', usersRoutes);
app.use('/admin/products', productRoutes);

// Sincronización con la base de datos y levantamiento del servidor
sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
});
