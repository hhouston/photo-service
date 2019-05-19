import { typeDefs as user } from './user'
import { typeDefs as coupon } from './coupon'
import { typeDefs as image } from './image'
import { typeDefs as photo } from './photo'
import { typeDefs as team } from './team'
import { typeDefs as event } from './event'
import { typeDefs as stripe } from './stripe'
import { typeDefs as query } from './query'
import { typeDefs as mutation } from './mutation'

export const typeDefs = [
  user, coupon, image, photo, team, stripe, event,
  query, mutation
]
