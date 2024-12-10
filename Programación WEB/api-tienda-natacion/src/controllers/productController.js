const { Product } = require('../models');

// Crear un producto
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        // Validar datos de entrada
        if (!name || !price || stock === undefined) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: name, price o stock.' });
        }

        // Crear el producto
        const newProduct = await Product.create({ name, description, price, stock });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto.', details: error.message });
    }
};

// Listar todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.', details: error.message });
    }
};

// Ruta para obtener un producto específico por su ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.', details: error.message });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        await product.update({ name, description, price, stock });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.', details: error.message });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto.', details: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById, // Asegúrate de exportar esta función
    updateProduct,
    deleteProduct,
};
