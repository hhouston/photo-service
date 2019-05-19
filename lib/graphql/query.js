import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getPhotos(id: ID! type: String!): [Photo!]
    getPhotosById(ids: [ID!]!): [Photo!]
    getPhotosByTeam(teamId: ID!): [Photo!]!
    getPhotosByPlayer(playerId: ID!): [Photo!]!
    getPhotosDownloadUrl(ids: [ID!]!): [String!]

    getTeams: [Team]
    getTeam(teamId: ID!): Team

    getEvents: [Event]
  }
`

export const resolvers = ({
  PhotoQuery,
  TeamQuery,
  EventQuery,
  StripeQuery
}) => ({
  getPhotos: (...args) => PhotoQuery.get(...args),
  getPhotosById: (...args) => PhotoQuery.getById(...args),
  getPhotosByTeam: (...args) => PhotoQuery.getByTeam(...args),
  getPhotosByPlayer: (...args) => PhotoQuery.getByPlayer(...args),
  getPhotosDownloadUrl: (...args) => PhotoQuery.getDownloadUrl(...args),

  getTeams: (...args) => TeamQuery.getTeams(...args),
  getTeam: (...args) => TeamQuery.getTeam(...args),

  getEvents: (...args) => EventQuery.getEvents(...args),

})

export default {
  typeDefs,
  resolvers
}
