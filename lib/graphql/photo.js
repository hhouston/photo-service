import gql from 'graphql-tag'

export const typeDefs = gql`
  input PhotoInput {
    pic: Upload
    path: String
    filename: String
    mimetype: String
    orgId: String
    teamId: String
    eventId: String
  }

  type Photo {
    id: String!
    url: String!
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
