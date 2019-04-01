export const typeDef = `
  type Photo {
    id: String!
    url: String!
  }
`

export const query = ({ photoService }) => ({
  getByEvent: (parent, args, context, info) => {
    console.log('args: ', args);
    return photoService.getPhotosByEvent()
  }
})

export default {
  typeDef,
  query
}
