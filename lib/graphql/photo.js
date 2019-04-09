const Photo = `
  type Photo {
    id: String!
    url: String!
  }
`

export const typeDefs = () => () => [
  Photo
]

export const query = ({ photoService }) => ({
  getByEvent: (parent, { eventId }, context, info) => {
    console.log('photoooooooo: ', photoService);
    return photoService.getPhotosByEvent({ eventId })
  }
})

export default {
  typeDefs,
  query
}
