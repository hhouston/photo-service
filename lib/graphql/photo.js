import gql from 'graphql-tag'

export const typeDefs = gql`
  type Photo {
    id: String!
    url: String!
  }
`

export const query = ({ photoService, mongoClient }) => ({
  getFeatured: (parent, context, info) => {
    return photoService.getPhotos({ type: 'featured' })
  },

  getByTeam: (parent, { teamId }, context, info) => {
    return photoService.getPhotosByTeam({ teamId })
  },

  getByEvent: async (parent, { eventId }, context, info) => {
    // console.log('mongoooo', await mongoClient())
    // const test = await mongoClient({ collection: 'test'})
    // console.log('==================', test);
    // console.log(test.collection('test'))
    // const testCol = test.collection('test')
    // const a = await testCol.insertOne( { employee: 3, status: { new: "Inactive", old: "Active" } } )
    // console.log('hhhhh', a);
    return photoService.getPhotosByEvent({ eventId })
  },

})

export default {
  typeDefs,
  query
}
