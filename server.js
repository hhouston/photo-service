import Koa from 'koa'
import { apolloUploadKoa } from 'apollo-upload-server'

import { ApolloServer, gql, GraphQLUpload } from 'apollo-server-koa'
import cors from '@koa/cors'

import { createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-koa'

import { typeDefs } from './lib/graphql'

import { createDependencies } from './lib'
import { MongoService } from './lib/services'

const dependencies = createDependencies()

const app = new Koa();
app.use(cors())
// app.use(apolloUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))

const server = new ApolloServer({
  typeDefs,
  resolvers: {
      Query: dependencies.resolve('Query'),
      Mutation: dependencies.resolve('Mutation'),
      Upload: GraphQLUpload
   },
   formatError: error => {
      console.log(error);
      return new Error('Internal server error');
      // Or, you can delete the exception information
      // delete error.extensions.exception;
      // return error;
    },
   uploads: {
      // Limits here should be stricter than config for surrounding
      // infrastructure such as Nginx so errors can be handled elegantly by
      // graphql-upload:
      // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
      maxFileSize: 10000000, // 10 MB
      maxFiles: 20
    }
})

server.applyMiddleware({ app })

app.listen({ port: 9000 }, () =>
  console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`),
)
