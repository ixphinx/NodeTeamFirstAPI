const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Business data');
});

module.exports = router;