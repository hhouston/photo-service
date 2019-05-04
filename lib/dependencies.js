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
  imageResolver,
  User,
  Image,
  Photo,
  Team,
  Stripe
} from './graphql'

import {
  UserService,
  PhotoService,
  TeamService,
  MongoService,
  StripeService,
  S3Service,
  createGetImageUrl
} from './services'

import { createMongoClient, createS3Client } from './clients'
import { createGenId } from './helper'
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
    ImageQuery: asFunction(Image.query),
    PhotoQuery: asFunction(Photo.query),
    PhotoMutation: asFunction(Photo.mutation),
    UserMutation: asFunction(User.mutation),
    TeamQuery: asFunction(Team.query),
    TeamMutation: asFunction(Team.mutation),
    StripeQuery: asFunction(Stripe.query),
    Query: asFunction(queryResolvers),
    Mutation: asFunction(mutationResolvers),
    Photo: asFunction(imageResolver),

    // services
    userService: asClass(UserService)
      .inject(() => ({
        burstCoupon: config.get('burstCoupon'),
        jwtToken: config.get('jwtToken')
      })).scoped(),
    mongoService: asClass(MongoService).scoped(),
    photoService: asClass(PhotoService).scoped(),
    teamService: asClass(TeamService).scoped(),
    stripeService: asClass(StripeService)
      .inject(() => ({ apiKey: config.get('stripeApiKey')}))
      .scoped(),
    s3Service: asClass(S3Service).scoped(),

    //functions
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

    genId: asFunction(createGenId).singleton(),
    app: asFunction(createApp).singleton()
  })

  return container
}
