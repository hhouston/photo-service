import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getByEvent(eventId: ID!): [Photo]
    getFeatured: [Photo]

    getTeams(orgId: ID!): [Team]
  }
`

export const resolvers = ({
  PhotoQuery,
  TeamQuery
}) => ({
  getByEvent: (...args) => PhotoQuery.getByEvent(...args),
  getFeatured: (...args) => PhotoQuery.getFeatured(...args),

  getTeams: (...args) => TeamQuery.getTeams(...args)
})

export default {
  typeDefs,
  resolvers
}
