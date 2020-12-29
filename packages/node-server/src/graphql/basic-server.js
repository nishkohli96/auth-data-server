const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const {
    username,
    pswd,
    server,
    dbName,
    restaurants_DB,
} = require('../constants');
const typeDefs = require('./schema/schema');
const PersonModel = require('_models/Person');
const rest_url = `mongodb+srv://${username}:${pswd}@${server}/${restaurants_DB}?retryWrites=true&w=majority`;
const person_url = `mongodb+srv://${username}:${pswd}@${server}/${dbName}?retryWrites=true&w=majority`;

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const resolvers = {
    Query: {
        books: () => books,
        restaurants: () => getRestaurants(),
    },
    Mutation: {
        addPerson: (parent, args) => addPerson(parent, args),
        changeRestaurantData: (parent, args) =>
            changeRestaurantData(parent, args),
    },
};

async function addPerson(parent, args) {
    const person = new PersonModel({
        name: args.name,
        age: args.age,
    });
    mongoose.connect(person_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () => {
        console.log(`Connected to DB : ${dbName}....`);
    });
    const res = await person.save();
    mongoose.connection.close(() => console.log('connection closed'));
    return res;
}

/* Get list of restaurants stored in MongoDB cloud */
async function getRestaurants() {
    await mongoose.connect(rest_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () => {
        console.log(`Connected to DB : ${restaurants_DB}....`);
    });
    /* Ideally try to do this by creating a model and then Model.save(); since this
    db was already created beforehand, I had to take this approach */
    const data = await mongoose.connection.db
        .collection('restaurants')
        .find({ cuisine: 'Indian' })
        .limit(5)
        .toArray();
    mongoose.connection.close(() => console.log('connection closed'));
    return data;
}

/* Update data of a restaurant */
async function changeRestaurantData(parent, args) {
    await mongoose.connect(rest_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () => {
        console.log(`Connected to DB : ${restaurants_DB}....`);
    });

    const data = (
        await mongoose.connection.db
            .collection('restaurants')
            .find({ restaurant_id: args.restaurant_id })
            .toArray()
    )[0];

    data.name = args.name;
    /* args.street is optional, thus the conditional operator */
    data.address.street = args.street ? args.street : data.address.street;

    /* Update the db */
    await mongoose.connection.db
        .collection('restaurants')
        .findOneAndUpdate(
            { restaurant_id: args.restaurant_id },
            { $set: data },
            { upsert: true }
        );

    mongoose.connection.close(() => console.log('connection closed'));
    return data;
}

const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: '/graphql', // opens gql playground at this route
        settings: {
            'editor.theme': 'dark',
        },
    },
});

/* Use this to run graphql server as it is */
// gqlServer.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

module.exports = gqlServer;
