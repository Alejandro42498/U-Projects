import express from 'express';  // Usar import en lugar de require
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';  // Usar import en lugar de require
import categoryController from '../controllers/categoryController.js';  // Usar import en lugar de require

const router = express.Router();

// Middleware para asegurarse de que el usuario está autenticado y es administrador
router.use(isAuthenticated, isAdmin);

// Rutas para las categorías
router.get('/', categoryController.listCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;  // Usar export default en lugar de module.exports
