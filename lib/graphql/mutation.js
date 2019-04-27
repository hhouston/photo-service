import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    addPhoto(photo: PhotoInput!): String
    login(credentials: LoginInput!): String
  }
`

export const resolvers = ({
  PhotoMutation,
  LoginMutation
}) => ({
  addPhoto: (...args) => PhotoMutation.addPhoto(...args),
  login: (...args) => LoginMutation.login(...args)
})

export default {
  typeDefs,
  resolvers
}
