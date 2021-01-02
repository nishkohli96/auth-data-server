const mongoFunctions = require('_mongoops/airbnb-ops');
let result;

async function routes(fastify) {
    fastify.get('/authors', async (request, reply) => {
        result = await mongoFunctions.connectToDB();
        reply.code(200).send(result);
        reply.end();
    });

    fastify.get('/addauthor', async (request, reply) => {
        result = await mongoFunctions.addAuthor(req.body);
        reply.send(
            result.insertedCount >= 1 ? 'Record Inserted' : 'Insertion Failed'
        );
        reply.end();
    });

    fastify.get('/getauthor', async (request, reply) => {
        result = await mongoFunctions.getAuthor(request.body.srchText);
        reply.code(200).send(result);
        reply.end();
    });

    fastify.get('/editauthor', async (request, reply) => {
        result = await mongoFunctions.editAuthor(request.body);
        reply.send(
            result.modifiedCount >= 1 ? 'Record Updated' : 'Update Failed'
        );
        reply.end();
    });

    fastify.get('/deleteauthor', async (request, reply) => {
        result = await mongoFunctions.deleteauthor(request.body.name);
        reply.send(
            result.deletedCount >= 1 ? 'Record Deleted' : 'Delete Failed'
        );
        reply.end();
    });
}

module.exports = routes;
