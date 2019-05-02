import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getByEvent(eventId: ID!): [Image]
    getFeatured: [Image]

    getPhotosByTeam(teamId: ID!): [Photo]

    getTeams: [Team]
    getTeam(teamId: ID!): Team

    post: String
  }
`

export const resolvers = ({
  PhotoQuery,
  TeamQuery,
  StripeQuery
}) => ({
  getByEvent: (...args) => PhotoQuery.getByEvent(...args),
  getFeatured: (...args) => PhotoQuery.getFeatured(...args),
  getPhotosByTeam: (...args) => PhotoQuery.getByTeam(...args),

  getTeams: (...args) => TeamQuery.getTeams(...args),
  getTeam: (...args) => TeamQuery.getTeam(...args),

  post: (...args) => StripeQuery.post(...args)
})

export default {
  typeDefs,
  resolvers
}
