const { ApolloServer, gql } = require('apollo-server-express');
const PersonModel = require('../mongo/model/Person');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Person {
    name: String
    age: Int
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addPerson(name: String!,age:Int!): Person
  }
`;

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