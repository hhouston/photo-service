import gql from 'graphql-tag'

export const typeDefs = gql`
  type Photo {
    id: String!
    url: String!
  }
`

export const query = ({ photoService, mongoClient }) => ({
  getFeatured: (parent, args, context, info) => {
    return photoService.getFeatured()
  },

  getByTeam: (parent, { teamId }, context, info) => {
    return photoService.getPhotosByTeam({ teamId })
  },

  getByEvent: async (parent, { eventId }, context, info) => {
    console.log('==================', mongoClient);
    const test = await mongoClient({ collection: 'test'})
    console.log('==================', test);
    return photoService.getPhotosByEvent({ eventId })
  },

})

export default {
  typeDefs,
  query
}
