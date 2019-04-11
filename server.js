import Koa from 'koa'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import cors from '@koa/cors'

import { ApolloServer, gql } from 'apollo-server-koa'

import { Schema } from './lib/graphql'
import { Photo, typeDefs } from './lib/graphql'

import { MongoDB } from './lib/mongodb'

import { createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-koa'

import { createDependencies } from './lib'
import { MongoService } from './lib/services'

const dependencies = createDependencies()

const app = new Koa();
app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers: { 
      Query: dependencies.resolve('Query'),
      Mutation: dependencies.resolve('Mutation')
   }
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
)
