import { createContainer, aliasTo, asClass, asFunction, asValue } from 'awilix'

import { PhotoService, MongoService } from './services'
import { createMongoClient } from './clients'

export default () => {
  const container = createContainer()

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

  return container
}
