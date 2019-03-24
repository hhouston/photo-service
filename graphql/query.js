import gql from 'graphql'

import { resolvers as Team } from './team'

console.log('Team: ', Team)

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
};

// const Query = gql`
//   type Query {
//     teams: [Team]
//   }
// `
//
// export const typeDefs = () => () => [
//   Query
// ]
//
// export const resolvers = ({
//   TeamsQuery
// }) => ({
//   teams: () => TeamsQuery.getAll()
// })
//
// export default {
//   typeDefs,
//   resolvers
// }

// const Team = gql`
//   type Team {
//     id: String!
//     name: String!
//   }
// `
//
// const Query = gql`
//   type Query {
//     teams: [Team]
//   }
// `
//
// export const typeDefs = () => () => [
//   Query
// ]
//
// export const resolvers = ({
//   TeamsQuery
// }) => ({
//   teams: () => TeamsQuery.getAll()
// })
//
// export default {
//   typeDefs,
//   resolvers
// }
