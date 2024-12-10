import passport from 'passport';  // Usar import en lugar de require
import { Strategy as LocalStrategy } from 'passport-local';  // Usar import en lugar de require
import bcrypt from 'bcrypt';  // Usar import en lugar de require
import User from '../models/user.js';  // Usar import en lugar de require

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;  // Usar export default en lugar de module.exports
