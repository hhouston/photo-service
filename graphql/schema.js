import {
  typeDef as TeamDef,
  resolvers as TeamRes
} from './team'
import Photo from './photo'
import { Query, resolvers } from './query'
import { makeExecutableSchema } from 'apollo-server'

console.log('team res: ', TeamRes);
export const Schema = makeExecutableSchema({
  typeDefs: [
    Query,
    TeamDef,
    Photo.typeDef
  ],
  resolvers: resolvers,
})

console.log('schhh: ', Schema)
