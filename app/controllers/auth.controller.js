exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = user;
    next();
  } else {
    res.locals.user = undefined;
    next();
  }    
};

exports.hasTweetAccess = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};