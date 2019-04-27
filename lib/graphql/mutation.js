import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    login(credentials: LoginInput!): String
    addPhotos(photos: PhotosInput!): String
    uploadFile(file: Upload!): String
  }
`

export const resolvers = ({
  PhotoMutation,
  LoginMutation
}) => ({
  login: (...args) => LoginMutation.login(...args),
  addPhotos: (...args) => PhotoMutation.addPhotos(...args),
  uploadFile: (...args) => PhotoMutation.uploadFile(...args)
})

export default {
  typeDefs,
  resolvers
}
