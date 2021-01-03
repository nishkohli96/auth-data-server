/* Use fastify-passport for passportJS routes, however it would require
    fastify > v3.*/

async function routes(fastify) {
    fastify.get('/success', function (req, res) {
        res.send('Login Successful');
    });

    fastify.get('/fail', function (req, res) {
        res.send('Authentication Failed ...');
    });
}

module.exports = routes;
