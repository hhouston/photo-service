import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    addPhotos(photos: PhotosInput!): String

    uploadFile(file: Upload!): String
  }
`

export const resolvers = ({
  PhotoMutation
}) => ({
  addPhotos: (...args) => PhotoMutation.addPhotos(...args),
  uploadFile: (...args) => PhotoMutation.uploadFile(...args)
})

export default {
  typeDefs,
  resolvers
}
