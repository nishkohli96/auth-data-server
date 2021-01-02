const facebookRouter = require('_passport/facebook');
const githubRouter = require('_passport/github');
const googleRouter = require('_passport/google');

async function routes(fastify) {
    fastify.get('/success', function (req, res) {
        res.send('Login Successful');
        res.end();
    });

    fastify.get('/fail', function (req, res) {
        res.send('Authentication Failed ...');
        res.end();
    });

    // fastify.get('',facebookRouter);
    // fastify.get('',githubRouter);
    // fastify.get('',googleRouter);
}

module.exports = routes;
