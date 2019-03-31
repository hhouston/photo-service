import express from 'express'
import graphqlHTTP from 'express-graphql'
// import gql from 'graphql-tag'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'

import { ApolloServer, gql } from 'apollo-server'

import { Schema } from './lib/graphql'

console.log('schema: ', Schema);

// var { buildSchema } = require('graphql');

// import { typeDefs } from './graphql'
//
// console.log('Query: ', typeDefs)
// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String,
//     hey: String
//   }
// `)
//
// const Team = gql`
//   type Team {
//     id: String!
//     name: String!
//   }
// `
//
// const Query = gql`
//   type Query {
//     teams: [Team]
//   }
// `
//
// export const typeDefs = [
//   Query
// ]

// const schema = makeExecutableSchema({
//   typeDefs
// })
//
// // The root provides a resolver function for each API endpoint
// const root = {
//   hello: ({ id }) => {
//     return 'Hello world!';
//   },
//   hey: () => {
//     return 'Hey world!';
//   },
//   teams: () => {
//     return [
//       {
//         id: '1',
//         name: 'Riptide'
//       }
//     ]
//   },
// };
//
// var app = express();
// app.use(cors())
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

// const typeDefs = [
//   Query
// ]
// const typeDefs = gql`
//   type Book {
//     title: String
//     author: String
//   }
//
//   type Query {
//     books: [Book]
//   }
// `

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  }
}

const server = new ApolloServer({
  schema: Schema
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})
