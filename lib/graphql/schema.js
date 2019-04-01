import {
  typeDef as Team
} from './team'
import {
  typeDef as Photo,
  query as PhotoQuery
} from './photo'
import { Query, resolvers } from './query'
import { makeExecutableSchema } from 'apollo-server'

export const Schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Photo
  ],
  resolvers: { Query: PhotoQuery }
})
