import {
  createContainer,
  aliasTo,
  asClass,
  asFunction,
  asValue
} from 'awilix'

import createApp from './app'

// import {
//   koaGraphql,
//   registerServer as registerGraphQLServer,
//   registerClients as registerGraphQLClients
// } from '@meltwater/mlabs-graphql'

// import * as graphqlModels from './graphql'
import config from 'config'
import { queryResolvers, Photo } from './graphql'
import { PhotoService, MongoService } from './services'
import { createMongoClient } from './clients'

export default () => {
  const container = createContainer()

  container.register({
    // graphql
    PhotoQuery: asFunction(Photo.query),
    Query: asFunction(queryResolvers),

    // clients

    // services
    mongoService: asClass(MongoService).scoped(),
    photoService: asClass(PhotoService).scoped(),

    // mongodb
    tableNames: asValue(config.get('tableNames'))
  })

  container.register(
    'mongoClient',
    asFunction(createMongoClient)
      .inject(() => ({
        url: config.get('mongoUrl')
      }))
      .singleton()
  )

  container.register({
    // App
    // graphql: asFunction(() => koaGraphql()).singleton(),
    app: asFunction(createApp).singleton()
  })

  return container
}
