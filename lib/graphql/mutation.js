import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    login(credentials: LoginInput!): String

    addTeam(team: TeamInput!): String

    addPhotos(photos: PhotosInput!): String
    uploadFile(file: Upload!): String
  }
`

export const resolvers = ({
  LoginMutation,
  // TeamMutation,
  PhotoMutation
}) => ({
  login: (...args) => LoginMutation.login(...args),

  addTeam: (...args) => TeamMutation.addTeam(...args),

  addPhotos: (...args) => PhotoMutation.addPhotos(...args),
  uploadFile: (...args) => PhotoMutation.uploadFile(...args)
})

export default {
  typeDefs,
  resolvers
}
