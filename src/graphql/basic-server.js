const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
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