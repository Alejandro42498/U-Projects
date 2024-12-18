import Category from '../models/category.js'; // Importar el modelo Category
import Product from '../models/product.js'; // Asegúrate de importar también el modelo Product para las asociaciones

// Función para listar categorías
export const listCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, as: 'Products' }],
    });
    res.render('admin/categories', { categories });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).send('Error al obtener categorías');
  }
};

// Función para crear una nueva categoría
export const createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    res.redirect('/admin/categories');
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).send('Error al crear categoría');
  }
};

// Función para actualizar una categoría existente
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.update(req.body, { where: { id } });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).send('Error al actualizar categoría');
  }
};

// Función para eliminar una categoría
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.destroy({ where: { id } });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).send('Error al eliminar categoría');
  }
};

// Exportar todas las funciones como parte del controlador
export default {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
