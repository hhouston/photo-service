import gql from 'graphql'

import { typeDef as QueryTypeDef,
query as Photo } from './photo'


export const Query = `
  type Query {
    addPhoto(photo: String): String
    photosByEvent(eventId: String): [Photo]
  }
`

// export const resolvers = ({
//   PhotoQuery,
//   TeamQuery
// }) => ({
//   photosByEvent: (...args) => PhotoQuery.getByEvent(...args)
// })

export const resolvers = ({ mongoService }) => ({
  addPhoto: (...args) => {
    console.log('hereeee:', args);
    return mongoService.addPhoto(...args)
  }
})

export default {
  resolvers
}
