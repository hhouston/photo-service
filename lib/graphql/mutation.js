import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    addPhotos(photos: [PhotoInput!]!): String
  }
`

export const resolvers = ({
  PhotoMutation
}) => ({
  addPhotos: (...args) => PhotoMutation.addPhotos(...args)
})

export default {
  typeDefs,
  resolvers
}
