import express from 'express'
import Koa from 'koa'
import graphqlHTTP from 'express-graphql'
// import gql from 'graphql-tag'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'

import { ApolloServer, gql } from 'apollo-server-koa'

import { Schema } from './lib/graphql'
import { Query, Photo } from './lib/graphql'

import { MongoDB } from './lib/mongodb'

import { createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-koa'

import { createDependencies } from './lib'
import { MongoService } from './lib/services'

// console.log('typeDefs: ', typeDefs)
const dependencies = createDependencies()
console.log('dependencies: ', dependencies.resolve('Query'))
console.log('graphql: ', Query, Photo)

const { typeDefs } = Query
const { resolvers } = Query

// const schema = makeExecutableSchema({
//   typeDefs: [Query, Photo], // function
//   resolvers // dep function
// })

console.log('typeDefs::: ', typeDefs);


const app = new Koa();
// app.use(cors())

// console.log('resolvers: ', resolvers);
// app.use(scopePerRequest(dependencies))



const server = new ApolloServer({
  typeDefs,
  resolvers: { Query: dependencies.resolve('Query') }
})

console.log('apppp', app)

server.applyMiddleware({ app })

//container.resolver(server.applyMiddleware({ app }))


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
