import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getByEvent(eventId: ID!): [PhotoOutput]
    getFeatured: [PhotoOutput]

    getTeams(orgId: ID!): [Team]

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

  getTeams: (...args) => TeamQuery.getTeams(...args),

  post: (...args) => StripeQuery.post(...args)
})

export default {
  typeDefs,
  resolvers
}
