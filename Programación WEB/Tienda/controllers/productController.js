import Product from '../models/Product.js';  // Asegúrate de que el modelo esté correctamente importado
import Joi from 'joi';

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().uri().optional(),
    categoryId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: 'Category' });
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().uri().optional(),
    categoryId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    await product.update(req.body);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    await product.destroy();
    res.status(204).send();  // No content, successful deletion
  } catch (err) {
    res.status(500).send(err.message);
  }
};
