import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getByEvent(eventId: ID!): [Photo]
    getFeatured: [Photo]

    getTeams(orgId: ID!): [Team]

    charge(tokenId: ID!): String
  }
`

export const resolvers = ({
  PhotoQuery,
  TeamQuery,
  StripeQuery
}) => ({
  getByEvent: (...args) => PhotoQuery.getByEvent(...args),
  getFeatured: (...args) => PhotoQuery.getFeatured(...args),

  getTeams: (...args) => TeamQuery.getTeams(...args),

  charge: (...args) => StripeQuery.charge(...args)
})

export default {
  typeDefs,
  resolvers
}
