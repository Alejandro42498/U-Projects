import Product from '../models/product.js';
import Category from '../models/category.js';

// Listar productos
export const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.render('admin/products', { products });
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.status(500).send('Error al listar productos');
  }
};

// Crear producto
export const createProduct = async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  try {
    await Product.create({ name, description, price, categoryId });
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).send('Error al crear producto');
  }
};

// Mostrar formulario de edición
export const editProductForm = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    const categories = await Category.findAll();
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('admin/editProduct', { product, categories });
  } catch (error) {
    console.error('Error al cargar el formulario de edición:', error);
    res.status(500).send('Error al cargar el formulario de edición');
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;
  try {
    await Product.update({ name, description, price, categoryId }, { where: { id } });
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).send('Error al actualizar producto');
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id } });
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).send('Error al eliminar producto');
  }
};

// Exportar todas las funciones
export default {
  listProducts,
  createProduct,
  editProductForm,
  updateProduct,
  deleteProduct,
};