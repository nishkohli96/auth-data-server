require('module-alias/register');
const Fastify = require('fastify');
const { port } = require('_pkgroot/constants');

async function build() {
    const fastify = Fastify({
        logger: {
            level: 'info',
            prettyPrint: true, // requires pino-pretty pkg
        },
        ignoreTrailingSlash: true,
        caseSensitive: false,
    });

    await fastify.register(require('middie'));
    fastify.register(require('fastify-cors'), {});

    fastify.register(require('./src/routes/airbnb-routes'), {
        prefix: '/airbnb',
    });
    fastify.register(require('./src/routes/author-routes'), {
        prefix: '/author',
    });
    fastify.register(require('./src/routes/passport-routes'), {
        prefix: '/auth',
    });

    return fastify;
}

// Run the server!
const start = async () => {
    build()
        .then((fastify) => fastify.listen(port || 4000))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
};

start();
