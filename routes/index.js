const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../authentication/auth');

router.get('/', (req, res) => res.render('welcome'));

router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard')
);

module.exports = router;