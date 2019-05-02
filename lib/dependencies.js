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
  Login,
  Image,
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
  createLoginUser,
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
    LoginMutation: asFunction(Login.mutation),
    TeamQuery: asFunction(Team.query),
    TeamMutation: asFunction(Team.mutation),
    StripeQuery: asFunction(Stripe.query),
    Query: asFunction(queryResolvers),
    Mutation: asFunction(mutationResolvers),
    Photo: asFunction(imageResolver),

    // services
    mongoService: asClass(MongoService).scoped(),
    photoService: asClass(PhotoService).scoped(),
    teamService: asClass(TeamService).scoped(),
    stripeService: asClass(StripeService).scoped(),
    s3Service: asClass(S3Service).scoped(),

    //functions
    getImageUrl: asFunction(createGetImageUrl)
      .inject(() => config.get('cloudfront'))
      .scoped(),
    loginUser: asFunction(createLoginUser)
      .inject(() => ({
        burstCoupon: config.get('burstCoupon'),
        jwtToken: config.get('jwtToken')}))
      .scoped(),

    // clients
    s3Client: asFunction(createS3Client)
      .inject(() => config.get('s3'))
      .singleton(),
    mongoClient: asFunction(createMongoClient)
      .inject(() => config.get('mongo'))
      .singleton(),

    genId: asFunction(createGenId).singleton(),
    tableNames: asValue(config.get('tableNames')),

    app: asFunction(createApp).singleton()
  })

  return container
}
