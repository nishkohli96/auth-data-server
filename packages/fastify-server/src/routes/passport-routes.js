/* Use fastify-passport for passportJS routes, however it would require
    fastify > v3.*/

async function routes(fastify) {
    fastify.get('/success', function (req, res) {
        res.send('Login Successful');
        res.end();
    });

    fastify.get('/fail', function (req, res) {
        res.send('Authentication Failed ...');
        res.end();
    });
}

module.exports = routes;
