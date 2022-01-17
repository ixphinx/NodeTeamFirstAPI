const express = require('express');
const router = express.Router();


router.get('/home', (req, res) => {
    res.send('You are in home ' + req.user.nickname);
});


module.exports = router;
