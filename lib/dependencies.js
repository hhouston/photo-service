import { createContainer, aliasTo, asClass, asFunction, asValue } from 'awilix'

import createApp from './app'

// import {
//   koaGraphql,
//   registerServer as registerGraphQLServer,
//   registerClients as registerGraphQLClients
// } from '@meltwater/mlabs-graphql'

import * as graphqlModels from './graphql'

import { PhotoService, MongoService } from './services'
import { createMongoClient } from './clients'

export default () => {
  const container = createContainer()

  console.log('graphqlmodels: ', graphqlModels)

  const { Query, Photo} = graphqlModels
  console.log('Query: ', Query, Photo);

  container.register({
    PhotoQuery: asFunction(Photo.query),
    Query: asFunction(Query.resolvers)
  })
  console.log('photo service: ', PhotoService);
  container.register({
    mongoService: asClass(MongoService).scoped(),
    photoService: asClass(PhotoService).scoped()
  })

  container.register(
    'mongoClient',
    asFunction(createMongoClient)
      .inject(() => ({
        url: 'mongodb://localhost:27017'
      }))
      .singleton()
  )

  // registerGraphQLServer(container, graphqlModels)
  // registerGraphQLClients(container, { ...clientDefaults })

  container.register({
    // App
    // graphql: asFunction(() => koaGraphql()).singleton(),
    app: asFunction(createApp).singleton()
  })

  return container
}
