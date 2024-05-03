import express from 'express';

const router = express.Router();

//route for homepage
router.get('/', (req, res) => {
  if (req.session && req.session.user)
    return res.render('homepage', { isAuthenticated: true });
  return res.render('homepage', { title: 'Homepage', isAuthenticated: false });
});

//login route
router.get('/login', (req, res) => {
  return res.render('login', { title: 'Login Page' });
});

//register route
router.get('/register', (req, res) => {
  return res.render('register', { title: 'Register Page' });
});

export default router;
