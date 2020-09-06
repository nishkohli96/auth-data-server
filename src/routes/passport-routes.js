const express = require('express');
const fbRouter = require('../passportjs/facebook');
const googleRouter = require('../passportjs/google');

const router = express.Router();

router.get('/success', function(req,res) {
    res.send('Login Successful');
    res.end();
})

router.get('/fail', function(req,res) {
    res.send('Authentication Failed ...');
    res.end();
})

router.use('', fbRouter);
router.use('', googleRouter);

module.exports = router;