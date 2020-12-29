const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const {
    username,
    pswd,
    server,
    dbName,
    usersCollection,
    userSchema,
} = require('../constants');

const url = `mongodb+srv://${username}:${pswd}@${server}/${dbName}?retryWrites=true&w=majority`;
const Schema = mongoose.Schema;

async function connectToDB() {
    return new Promise(async function (resolve, reject) {
        await mongoose
            .connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            })
            .then(() => {
                const model = new Schema(userSchema);
                model.plugin(findOrCreate);
                const userModel = mongoose.model(usersCollection, model);
                resolve(userModel);
            });
    });
}

module.exports = { connectToDB };
