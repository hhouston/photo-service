// const Query = `
//   type Query {
//     getByEvent(eventId: ID!): [Photo]
//   }
// `

import gql from 'graphql-tag'

export const typeDefs = gql`
  type Photo {
    id: String!
    url: String!
  }

  type Query {
    getByEvent(eventId: ID!): [Photo]
  }
`

export const resolvers = ({
  PhotoQuery
}) => ({
  getByEvent: (...args) => PhotoQuery.getByEvent(...args)
})

export default {
  typeDefs,
  resolvers
}
