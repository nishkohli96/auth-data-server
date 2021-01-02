const express = require('express');
const router = express.Router();
const mongoFunctions = require('_mongoops/airbnb-ops');

let result;

router.get('/list', async function (req, res) {
    result = await mongoFunctions.findLimitSkip();
    res.send(result);
    res.end();
});

router.get('/andor', async function (req, res) {
    result = await mongoFunctions.andOrop();
    res.send(result);
    res.end();
});

router.get('/expr', async function (req, res) {
    result = await mongoFunctions.fieldExpr();
    res.send(result);
    res.end();
});

module.exports = router;
