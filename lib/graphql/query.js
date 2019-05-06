import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getPhotosById(ids: [ID!]!): [Photo!]
    getPhotosByTeam(teamId: ID!): [Photo!]!
    getPhotosByPlayer(playerId: ID!): [Photo!]!

    getTeams: [Team]
    getTeam(teamId: ID!): Team
  }
`

export const resolvers = ({
  PhotoQuery,
  TeamQuery,
  StripeQuery
}) => ({
  getPhotosById: (...args) => PhotoQuery.getById(...args),
  getPhotosByTeam: (...args) => PhotoQuery.getByTeam(...args),
  getPhotosByPlayer: (...args) => PhotoQuery.getByPlayer(...args),

  getTeams: (...args) => TeamQuery.getTeams(...args),
  getTeam: (...args) => TeamQuery.getTeam(...args),

})

export default {
  typeDefs,
  resolvers
}
