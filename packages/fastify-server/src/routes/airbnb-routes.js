const mongoFunctions = require('_mongoops/airbnb-ops');
let result;

async function routes(fastify) {
    fastify.get('/list', async (request, reply) => {
        result = await mongoFunctions.findLimitSkip();
        reply.code(200).send(result);
    });

    fastify.get('/andor', async (request, reply) => {
        result = await mongoFunctions.andOrop();
        reply.code(200).send(result);
    });

    fastify.get('/expr', async (request, reply) => {
        result = await mongoFunctions.fieldExpr(request.body);
        reply.code(200).send(result);
    });

    fastify.get('/params/:id/book/:sth', async (request, reply) => {
        console.log(request.params);
        result = `Req Params are - id: ${request.params.id} book: ${request.params.sth}`;
        reply.code(200).send(result);
    });

    /*  Can get a { status, msg, err } obj in result and accordingly, populate 
        in reply */
    fastify.get('/pt', async function (request, reply) {
        console.log('query ', request.query);
        result = await mongoFunctions.paginateResults(
            request.query.page,
            request.query.limit
        );
        reply.send(result);
    });
}

module.exports = routes;
