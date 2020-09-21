const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const PersonModel = require('../mongo/model/Person');

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