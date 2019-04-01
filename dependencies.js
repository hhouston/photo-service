import { createContainer, aliasTo, asClass, asFunction, asValue } from 'awilix'

import { PhotoService } from './lib/services'
export default () => {
  const container = createContainer()

  container.register({
    photoService: asClass(PhotoService).scoped()
  })

}
