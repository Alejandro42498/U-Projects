const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        const { id, createdAt, updatedAt } = newUser;

        res.status(201).json({ id, username, createdAt, updatedAt });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario.', details: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET, // Asegúrate de que este valor esté definido en .env
            { expiresIn: '1h' } // El token expira en 1 hora
        );
        
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión.', details: error.message });
    }
};

module.exports = { createUser, loginUser };
