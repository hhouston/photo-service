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

import createApp from './app'
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
  createGetImageUrl
} from './services'

import { createMongoClient } from './clients'

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
    getImageUrl: asFunction(createGetImageUrl)
      .inject(() => config.get('cloudfront'))
      .scoped(),



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
    app: asFunction(createApp).singleton()
  })

  return container
}
