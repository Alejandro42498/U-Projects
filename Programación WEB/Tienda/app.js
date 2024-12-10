const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');

dotenv.config();

const app = express();

// Configuración de la base de datos
sequelize.sync();

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', require('./routes/productRoutes'));
app.use('/shopping-cart', require('./routes/orderRoutes'));
app.use('/admin/categories', require('./routes/categoryRoutes'));
app.use('/admin/products', require('./routes/productRoutes'));
app.use('/admin/orders', require('./routes/orderRoutes'));
app.use('/admin/users', require('./routes/userRoutes'));

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto 3000');
});