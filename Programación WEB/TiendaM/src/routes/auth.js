import express from 'express';  // Usar import en lugar de require
import passport from '../middlewares/passport.js';  // Usar import en lugar de require

const router = express.Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
  res.render('client/login');
});

// Ruta para manejar el inicio de sesión
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redirige al inicio si la autenticación es exitosa
  failureRedirect: '/auth/login',
  failureFlash: true, // Permite mostrar un mensaje de error si la autenticación falla
}));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

export default router;  // Usar export default en lugar de module.exports
