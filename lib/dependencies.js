import fs from 'fs'
import util from 'util'

import createLogger from '@meltwater/mlabs-logger'

import {
  createContainer,
  aliasTo,
  asClass,
  asFunction,
  asValue
} from 'awilix'

import config from 'config'

import {
  queryResolvers,
  mutationResolvers,
  Photo,
  Team,
  Stripe
} from './graphql'

import {
  PhotoService,
  TeamService,
  MongoService,
  StripeService,
  S3Service,
  createGetImageUrl
} from './services'

import { createMongoClient, createS3Client } from './clients'
import createApp from './app'

export default () => {
  const container = createContainer()

  const logOptions = {
    outputMode: 'pretty',
    name: 'action-sports'
  }

  container.register({
    log: asFunction(() => createLogger(logOptions)),

    // graphql
    PhotoQuery: asFunction(Photo.query),
    PhotoMutation: asFunction(Photo.mutation),
    TeamQuery: asFunction(Team.query),
    StripeQuery: asFunction(Stripe.query),
    Query: asFunction(queryResolvers),
    Mutation: asFunction(mutationResolvers),

    // services
    mongoService: asClass(MongoService).scoped(),
    photoService: asClass(PhotoService).scoped(),
    teamService: asClass(TeamService).scoped(),
    stripeService: asClass(StripeService).scoped(),
    s3Service: asClass(S3Service).scoped(),
    getImageUrl: asFunction(createGetImageUrl)
      .inject(() => config.get('cloudfront'))
      .scoped(),

    // clients
    s3Client: asFunction(createS3Client)
      .inject(() => config.get('s3'))
      .singleton(),
    mongoClient: asFunction(createMongoClient)
      .inject(() => config.get('mongo'))
      .singleton(),

    tableNames: asValue(config.get('tableNames')),
    app: asFunction(createApp).singleton()
  })

  return container
}
