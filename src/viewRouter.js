const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login',{page: 'login'});
});

router.get('/register', (req, res) => {
    res.render('login',{page: 'register'});
});

module.exports = router;