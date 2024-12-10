
import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router.get('/', productController.listProducts);
router.post('/create', productController.createProduct);
router.get('/edit/:id', productController.editProductForm);
router.post('/edit/:id', productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);

export default router;
