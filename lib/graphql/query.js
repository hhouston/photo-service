import gql from 'graphql'

import { resolvers as Team } from './team'
import { resolver as Photo } from './photo'

console.log('photo: ', Photo)

export const Query = `
  type Query {
    teams: [Team!]!
    photos(teamId: String!): [Photo!]!
  }
`

export const resolvers = {
  Query: {
    teams: () => {
      return [
        {
          id: '1',
          name: 'Riptide'
        }
      ]
    }
  }
}
