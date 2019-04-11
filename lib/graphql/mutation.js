import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    addPhoto(photo: PhotoInput!): String
  }
`

export const resolvers = ({
  PhotoMutation
}) => ({
  addPhoto: (...args) => PhotoMutation.addPhoto(...args)
})

export default {
  typeDefs,
  resolvers
}