const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agregar la información del usuario al objeto `req`
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token no válido.' });
    }
};

module.exports = authenticate;
