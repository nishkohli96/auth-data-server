const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const db_name = 'MyDB';
const collectionName = 'authors';
const pswd = 'dragon123Nish';
const username = 'nish1896';
const server = 'cluster0.tlouv.mongodb.net';

const url = `mongodb+srv://${username}:${pswd}@${server}/${db_name}?retryWrites=true&w=majority`;

const client = new MongoClient(url, { useNewUrlParser: true,useUnifiedTopology: true });

/* Retrieve the list of all authors */
async function connectToDB() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true }, 
        async function(err, client) {
            const db = client.db(db_name);
            const res = await db.collection(collectionName).find().toArray();
            client.close();
            resolve(res);
            reject(err);
        });
    });
}

/* Add an author to MongoDB */
async function addAuthor(author) {
    return new Promise(function(resolve, reject) {
        client.connect()
        .then( async() => {
            const res = await client.db(db_name).collection(collectionName);
            const outcome = await res.insertOne(author);
            /* Refer upsert here
                https://docs.mongodb.com/manual/reference/method/Bulk.find.upsert/
            */
            client.close();
            resolve(outcome);
        });
    });
}

/* Retrieve an author details */
async function getAuthor(srchText) {
    return new Promise(function(resolve, reject) {
        client.connect()
        .then( async() => {
            const res = await client.db(db_name).collection(collectionName);
            const outcome = await res.findOne({ name: srchText });
            client.close();
            resolve(outcome);
        });
    });
}

async function editAuthor(author) {
    return new Promise(function(resolve, reject) {
        client.connect()
        .then( async() => {
            const res = await client.db(db_name).collection(collectionName);
            const outcome = await res.updateOne({ name: author.name },
                [
                  { $set : { books: author.books , bio: author.bio } } 
                ]);

            client.close();
            resolve(outcome);
        });
    });
}

async function deleteAuthor(name) {
    return new Promise(function(resolve, reject) {
        client.connect()
        .then( async() => {
            const res = await client.db(db_name).collection(collectionName);
            const outcome = await res.deleteOne({ name: name });
            client.close();
            resolve(outcome);
        });
    });
}

module.exports = { connectToDB, addAuthor, getAuthor, editAuthor, deleteAuthor }
