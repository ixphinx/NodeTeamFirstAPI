const express = require('express');
const router = express.Router();
const passport = require('passport');

const Data = require('../models/index.js');


router.post('/sign-up', passport.authenticate('local-signup',{
    successRedirect: '/home',
    failureRedirect: '/per/login-fail',
    passReqToCallback: true
}));

router.post('/sign-in', passport.authenticate('local-signin',{
    successRedirect: '/home',
    failureRedirect: '/per/login-fail',
    passReqToCallback: true
}));


router.get('/login-fail', (req,res)=>{
    res.send('Sign up fail');
});


function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};



module.exports = router;