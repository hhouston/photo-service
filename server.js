import Koa from 'koa'
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer, gql } from 'apollo-server-koa'
import cors from '@koa/cors'

import { createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-koa'

import { typeDefs } from './lib/graphql'

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

app.listen({ port: 9000 }, () =>
  console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`),
)
