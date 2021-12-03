const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const user = require('../models/user');
const passport = require('passport');


router.get('/login', (req, res) => res.render('login'));


// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('sucess_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;