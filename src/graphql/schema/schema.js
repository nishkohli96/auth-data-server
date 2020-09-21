const { gql } = require('apollo-server-express');

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

module.exports = typeDefs;