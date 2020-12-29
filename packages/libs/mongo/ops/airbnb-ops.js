const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const DBconstants = require('_pkgroot/constants');

const url = `mongodb+srv://${DBconstants.username}:${DBconstants.pswd}@${DBconstants.server}?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/* The dataset is very large, so don't try to get all data, else server crashes */

/* Get 10 records starting from the 4th document */
async function findLimitSkip() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            async function (err, client) {
                const db = client.db(DBconstants.airbnb_DB);
                const res = await db
                    .collection(DBconstants.airbnb_collection)
                    .find()
                    .skip(3)
                    .limit(10)
                    .toArray();
                client.close();
                resolve(res);
                reject(err);
            }
        );
    });
}

/* Add an author to MongoDB */
async function andOrop() {
    return new Promise(function (resolve, reject) {
        client.connect().then(async () => {
            const res = await client
                .db(DBconstants.airbnb_DB)
                .collection(DBconstants.airbnb_collection)
                .find({
                    $or: [
                        { minimum_nights: { $gte: 2 } },
                        { price: { $lt: 200 } },
                    ],
                })
                .limit(3)
                .toArray();
            client.close();
            resolve(res);
        });
    });
}

/* Compare two fields with each other; ie find records where security_deposit value > price */
async function fieldExpr() {
    return new Promise(function (resolve, reject) {
        client.connect().then(async () => {
            const res = await client
                .db(DBconstants.airbnb_DB)
                .collection(DBconstants.airbnb_collection)
                .find({ $expr: { $gt: ['$security_deposit', '$price'] } })
                .limit(3)
                .toArray();
            client.close();
            resolve(res);
        });
    });
}

async function editAuthor(author) {
    return new Promise(function (resolve, reject) {
        client.connect().then(async () => {
            const res = await client
                .db(DBconstants.dbName)
                .collection(DBconstants.collectionName);
            const outcome = await res.updateOne({ name: author.name }, [
                { $set: { books: author.books, bio: author.bio } },
            ]);

            client.close();
            resolve(outcome);
        });
    });
}

async function deleteAuthor(name) {
    return new Promise(function (resolve, reject) {
        client.connect().then(async () => {
            const res = await client
                .db(DBconstants.dbName)
                .collection(DBconstants.collectionName);
            const outcome = await res.deleteOne({ name: name });
            client.close();
            resolve(outcome);
        });
    });
}

module.exports = {
    findLimitSkip,
    andOrop,
    fieldExpr,
    editAuthor,
    deleteAuthor,
};
