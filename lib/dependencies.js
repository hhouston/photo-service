import fs from 'fs'
import util from 'util'

import createLogger from '@meltwater/mlabs-logger'
import cfsign from 'aws-cloudfront-sign'
import {
  createContainer,
  aliasTo,
  asClass,
  asFunction,
  asValue
} from 'awilix'

import createApp from './app'
import config from 'config'
import { queryResolvers, mutationResolvers, Photo, Team } from './graphql'
import { PhotoService, TeamService, MongoService } from './services'
import {
    createMongoClient,
    createCloudfrontClient
} from './clients'

const readFile = util.promisify(fs.readFile);
const getStuff = async (file) => {
    return await readFile(file);
}

export default () => {
  const container = createContainer()

  const logOptions = {
    outputMode: 'pretty',
    name: 'action-sports'
  }

    // const signingParams = {}

    // getStuff('config/secret.d/cloudfront-public').then(data => {
    //     signingParams = {
    //       keypairId: '',
    //       privateKeyString: data.split('\\n').concat().join('\n'),
    //       // Optional - this can be used as an alternative to privateKeyString
    //       // privateKeyPath: '/path/to/private/key',
    //       expireTime: 1426625464599
    //     }
    //     console.log('---------------', data);
    // })


    // console.log('--------------', config.get('config:secret.cloudfront_private_key'))
    // const signingParams = {
    //   keypairId: "",
    //   // privateKeyString: config.get('cloudfront.privateKey'),
    //   // Optional - this can be used as an alternative to privateKeyString
    //   // privateKeyPath: '/path/to/private/key',
    //   expireTime: 1426625464599
    // }

    // const signedUrl = cfsign.getSignedUrl(
    //   'https://d3gaqejqo5el7.cloudfront.net/fit-in/1500x1500/safe-url/181214OpenTable_NOPB6_322.jpg',
    //   signingParams
    // )

    // console.log('signed url-----;m ', signedUrl);

  container.register({
    log: asFunction(() => createLogger(logOptions)),

    // graphql
    PhotoQuery: asFunction(Photo.query),
    PhotoMutation: asFunction(Photo.mutation),
    TeamQuery: asFunction(Team.query),
    Query: asFunction(queryResolvers),
    Mutation: asFunction(mutationResolvers),

    // services
    mongoService: asClass(MongoService).scoped(),
    photoService: asClass(PhotoService).scoped(),
    teamService: asClass(TeamService).scoped(),

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

  container.register(
    'cloudfrontClient',
    asFunction(createCloudfrontClient)
      .inject(() => config.get('cloudfront'))
      .singleton()
  )

  container.register({
    // App
    app: asFunction(createApp).singleton()
  })

  return container
}
