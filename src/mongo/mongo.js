const mongodb = require('mongodb-client');

async function connectToDB(){
                 return await mongodb.connect();
} 