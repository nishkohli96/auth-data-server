const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
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
    persons: [Person]
    restaurants: [Restaurant]
  }

  type Mutation {
    addPerson(name: String!,age:Int!): Person
    changeRestaurantData(restaurant_id: String!, name: String!,street: String): Restaurant
  }

  type Grades {
    date: Date
    grade: String
    score:Int
  }

  type Address {
    building: String
    coord: [Float]
    street: String
    zipcode: String
  }

  type Restaurant {
    address: Address
    borough: String
    cuisine:String
    grades: [Grades]
    name: String
    restaurant_id: String
  }
`;

module.exports = typeDefs;