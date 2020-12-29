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

router.put('/editauthor', async function (req, res) {
    result = await mongoFunctions.editAuthor(req.body);
    res.send(result.modifiedCount >= 1 ? 'Record Updated' : 'Update Failed');
    res.end();
});

router.delete('/deleteauthor', async function (req, res) {
    result = await mongoFunctions.deleteAuthor(req.body.name);
    res.send(result.deletedCount >= 1 ? 'Record Deleted' : 'Delete Failed');
    res.end();
});

module.exports = router;
