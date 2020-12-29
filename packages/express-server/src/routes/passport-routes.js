const express = require('express');
const facebookRouter = require('_passport/facebook');
const githubRouter = require('_passport/github');
const googleRouter = require('_passport/google');

const router = express.Router();

router.get('/success', function (req, res) {
    res.send('Login Successful');
    res.end();
});

router.get('/fail', function (req, res) {
    res.send('Authentication Failed ...');
    res.end();
});

router.use('', facebookRouter);
router.use('', githubRouter);
router.use('', googleRouter);

module.exports = router;
