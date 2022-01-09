const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/home', (req, res)=>{
    res.write('You are in home');
});

router.post('/login', passport.authenticate('local'), (req, res)=>{
    if (req.body.user == 'test') {
        res.send('User OK');
    } else {
        res.send(401);
    }
});

module.exports = router;
