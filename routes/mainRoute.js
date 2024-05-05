import express from 'express';

const router = express.Router();

//route for homepage
router.get('/', (req, res) => {
  if (req.session && req.session.user)
    return res.render('homepage', { title: 'Homepage', isAuthenticated: true });
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

//add property route
router.get('/addProperty', (req, res) => {
  return res.render('addProperty', {isAuthenticated: true, title: 'Add Property Page' });
});

router.get('/editProperty', (req, res) => {
  return res.render('editProperty', {isAuthenticated: true, title: 'Edit Property Page' });
});

export default router;
