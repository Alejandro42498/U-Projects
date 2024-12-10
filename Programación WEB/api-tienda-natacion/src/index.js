require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Middleware para procesar JSON
app.use(express.json());

// Registrar las rutas
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

const path = require('path');
// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
