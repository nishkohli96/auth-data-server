const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const { username, pswd, server, restaurants_DB } = require('../constants');
const typeDefs = require('./schema/schema');
const PersonModel = require('../mongo/model/Person');
const url = `mongodb+srv://${username}:${pswd}@${server}/${restaurants_DB}?retryWrites=true&w=majority`;

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
      restaurants: () => getRestaurants()
    },
    Mutation: {
      addPerson: (parent,args) => {
        const person = new PersonModel({
          name: args.name,
          age: args.age
        });
        return person.save(); 
      }
    }
};

/* Get list of restaurants stored in MongoDB cloud */
async function getRestaurants(){  
  mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.once('open',() => {
    console.log('Connected to MongoDB Server....')
  });
  const data = await mongoose.connection.db.collection('restaurants')
    .find({}).limit(5).toArray();  
  mongoose.connection.close(() => console.log('connection closed'))      
  return data;
}

const gqlServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    playground: {
        endpoint: '/graphql',  // opens gql playground at this route
        settings: {
            'editor.theme': 'dark' 
        }
    } 
});

/* Use this to run graphql server as it is */
// gqlServer.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

module.exports = gqlServer;