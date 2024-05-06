export const loginMiddleware = (req, res, next) => {
  if (!req.session.user) return next();
  if (req.session.user) {
    return res.redirect('/');
  }
};

export const registerMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
};

export const userMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
};

export const addPropertyMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
};

export const editPropertyMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
};

export const searchPropertyMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
};
