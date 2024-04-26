import express from 'express';

const router = express.Router();

//route for homepage
router.get('/', (req, res) => {
    return res.render('homepage', {title: "Homepage"});
});

//login route
router.get('/login', (req, res) => {
    return res.render('login', {title: "Login Page"});
})

//register route
router.get('/register', (req, res) => {
    return res.render('register', {title: "Register Page"});
})

export default router;