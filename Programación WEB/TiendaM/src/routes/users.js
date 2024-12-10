import express from 'express';  // Usar import en lugar de require
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';  // Usar import en lugar de require
import userController from '../controllers/userController.js';  // Usar import en lugar de require

const router = express.Router();

// Middleware para asegurarse de que el usuario está autenticado y es administrador
router.use(isAuthenticated, isAdmin);

// Rutas para los usuarios
router.get('/', userController.listUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;  // Usar export default en lugar de module.exports
