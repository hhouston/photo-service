import gql from 'graphql'

import { typeDef as QueryTypeDef,
query as Photo } from './photo'


export const Query = `
  type Query {
    photos(teamId: String!): [Photo!]!
    photosByEvent(eventId: String): [Photo]
  }
`

export const resolvers = ({
  PhotoQuery,
  TeamQuery
}) => ({
  photosByEvent: (...args) => PhotoQuery.getByEvent(...args)
})

export default {
  resolvers
}
