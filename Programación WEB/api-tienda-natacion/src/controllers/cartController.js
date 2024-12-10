const { Cart, Product } = require('../models');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        const cartItem = await Cart.findOne({ where: { userId, productId } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await Cart.create({ userId, productId, quantity });
        }

        res.status(200).json({ message: 'Producto agregado al carrito.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar al carrito.', details: error.message });
    }
};


const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const cartItem = await Cart.findOne({ where: { id, userId } });
        if (!cartItem) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Producto eliminado del carrito.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito.', details: error.message });
    }
};

const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartItems = await Cart.findAll({
            where: { userId },
            include: {
                model: Product,
                as: 'product', // Usa el alias definido en cart.js
                attributes: ['id', 'name', 'price', 'description', 'stock'], // Define los campos que necesitas
            },
        });

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos del carrito.', details: error.message });
    }
};

module.exports = { addToCart, getCartItems, removeFromCart };

