import {
  typeDef as Team
} from './team'
import {
  typeDef as Photo,
  query as PhotoQuery
} from './photo'
// import { Query, resolvers } from './query'
import { makeExecutableSchema } from 'apollo-server'
import { MongoService } from '../services'

// export const Schema = makeExecutableSchema({
//   typeDefs: [
//     Query,
//     Photo
//   ],
//   resolvers: { Query: PhotoQuery }
// })

export const typeDefs = `
  type Photo {
    id: String!
    url: String!
  }

  # the schema allows the following query:
  type Query {
    photos: [Photo],
    test: String
  }
`

export const resolvers = ({ mongoService }) => ({
  Query: {
    photos: () => ([{id: '123', url: 'test-url'}]),
    test: () => 'here'
  }
})

// console.log('resolvers: ', resolvers)

// export const Schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// })
