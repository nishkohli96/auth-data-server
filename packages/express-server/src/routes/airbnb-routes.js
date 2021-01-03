const express = require('express');
const router = express.Router();
const mongoFunctions = require('_mongoops/airbnb-ops');

let result;

/*  Learn more at 
    https://expressjs.com/en/guide/routing.html
*/

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

router.get('/params/:id/book/:sth', async function (req, res) {
    console.log(req.params);
    res.send(`Req Params are - id: ${req.params.id} book: ${req.params.sth}`);
    res.end();
});

/* http://localhost:5000/airbnb/pt?page=2&limit=20 */
// Make sure page >= 1
router.get('/pt', async function (req, res) {
    console.log('query ', req.query);
    result = await mongoFunctions.paginateResults(
        req.query.page,
        req.query.limit
    );
    res.send(result);
    res.end();
});

module.exports = router;
