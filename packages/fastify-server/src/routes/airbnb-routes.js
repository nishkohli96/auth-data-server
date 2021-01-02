const mongoFunctions = require('_mongoops/airbnb-ops');
let result;

async function routes(fastify) {
    fastify.get('/list', async (request, reply) => {
        result = await mongoFunctions.findLimitSkip();
        reply.code(200).send(result);
        reply.end();
    });

    fastify.get('/andor', async (request, reply) => {
        result = await mongoFunctions.andOrop();
        reply.code(200).send(result);
        reply.end();
    });

    fastify.get('/expr', async (request, reply) => {
        result = await mongoFunctions.fieldExpr(request.body);
        reply.code(200).send(result);
        reply.end();
    });
}

module.exports = routes;
