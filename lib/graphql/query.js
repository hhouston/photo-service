import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getByEvent(eventId: ID!): [Photo]
    getFeatured(): [Photo]
  }
`

export const resolvers = ({
  PhotoQuery
}) => ({
  getByEvent: (...args) => PhotoQuery.getByEvent(...args),
  getFeatured: (...args) => PhotoQuery.getFeatured(...args)
})

export default {
  typeDefs,
  resolvers
}
