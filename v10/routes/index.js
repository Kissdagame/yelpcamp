const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

//middleware 

// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };

// Root route
router.get('/', (req, res) => {
    res.render('landing');
});

// auth routes

// register form route

router.get('/register', (req, res) => {
    res.render('register');
});

// handles the sign up logic
router.post('/register', (req, res) => {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campgrounds');
        });
    });
});

// show login form

router.get('/login', (req, res) => {
    res.render('login');
});

// handles the login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {

});

// logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;