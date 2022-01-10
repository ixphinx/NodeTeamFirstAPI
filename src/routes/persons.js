const express = require('express');
const router = express.Router();
const passport = require('passport');

const Data = require('../models/index.js');




router.get('/', (req, res) => {
    res.send('Person data');
});


router.post('/sign-up', passport.authenticate('local-signup',{
    successRedirect: '/',
    failureRedirect: '/per/login-fail',
    passReqToCallback: true
}));

router.post('/signup',(req,res)=>{
    res.send(req.body);
});


router.get('/login-fail', (req,res)=>{
    res.send('Sign up fail');
});



module.exports = router;