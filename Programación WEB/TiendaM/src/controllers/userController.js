import bcrypt from 'bcrypt';  // Usar import en lugar de require
import User from '../models/user.js';  // Usar import en lugar de require

// Listar todos los usuarios
export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    res.json(user);
  } catch (error) {
    res.status(500).send('Error al crear el usuario');
  }
};

// Actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.role = role;
      await user.save();
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el usuario');
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.sendStatus(204);  // No content, successful deletion
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al eliminar el usuario');
  }
};

  export default {
    listUsers,
    createUser,
    updateUser,
    deleteUser,
  
};
