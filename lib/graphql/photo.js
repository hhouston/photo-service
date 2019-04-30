import gql from 'graphql-tag'

export const typeDefs = gql`
  input PhotosInput {
    files: [Upload!]!
    orgId: String
    teamId: String
    eventId: String
  }

  type Image {
    url: String!
    width: Int!
    height: Int!
  }
`

export const query = ({ photoService }) => ({
  getFeatured: (parent, args, context, info) => {
    return photoService.getPhotos({ type: 'featured' })
  },

  getByTeam: (parent, { teamId }, context, info) => {
    return photoService.getPhotosByTeam({ teamId })
  },

  getByEvent: async (parent, { eventId }, context, info) => {
    return photoService.getPhotosByEvent({ eventId })
  }
})

export const mutation = ({ photoService }) => ({
  addPhotos: async (parent, { photos }, context, info) => {
    return photoService.addPhotos({ photos })
  }
})

export default {
  typeDefs,
  query,
  mutation
}
