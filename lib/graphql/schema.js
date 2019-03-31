import {
  typeDef as Team
} from './team'
import Photo from './photo'
import { Query, resolvers } from './query'
import { makeExecutableSchema } from 'apollo-server'

export const Schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Team,
    Photo.typeDef
  ],
  resolvers,
})

console.log('schhh: ', Schema)
