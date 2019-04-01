import express from 'express'
import Koa from 'koa'
import graphqlHTTP from 'express-graphql'
// import gql from 'graphql-tag'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'

import { ApolloServer, gql } from 'apollo-server-koa'

import { Schema, Photo } from './lib/graphql'
import { Query, resolvers } from './lib/graphql'

import { MongoDB } from './lib/mongodb'

import { createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-koa'

import { createDependencies } from './lib'
import { MongoService } from './lib/services'

console.log('service: ', MongoService)
const dependencies = createDependencies()
console.log('depppp: ', dependencies)

const schema = makeExecutableSchema({
  typeDefs: [Query, Photo],
  resolvers
})

console.log('schema::: %j', Schema);

const server = new ApolloServer({
  schema: Schema
})

const app = new Koa();
// app.use(cors())


app.use(scopePerRequest(dependencies))

// app.use((ctx, next) => {
//   // ctx.scope = container.createScope()
//
//   ctx.scope.register({
//
//     dependencies
//   })
//
//   return next()
// })

console.log('apppp', app)

server.applyMiddleware({ app })


app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
)








// const mongoClient = new MongoDB
// console.log('mongoClient', mongoClient.start());
//
// console.log('Photo: ', Photo);
// console.log('Query: ', Query);
// console.log('resolvers: ', resolvers);
// console.log('schema: ', Schema);

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
// const app = express();
// app.use(cors())
//
// server.applyMiddleware({ app })
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');


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
