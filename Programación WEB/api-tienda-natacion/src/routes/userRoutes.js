const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { createUser, loginUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

// Ruta para crear un usuario (pública)
router.post('/', createUser);

// Ruta para iniciar sesión (pública)
router.post('/login', loginUser);

// Ruta protegida para obtener todos los usuarios
router.get('/', authenticate, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios.', details: error.message });
    }
});

module.exports = router;
