export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  res.redirect('/');
};

