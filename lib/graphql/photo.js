import gql from 'graphql-tag'

export const typeDefs = gql`
  input PhotosInput {
    files: [Upload!]!
    teamId: String
    eventId: String
    playerId: String
  }

  type Photo {
    id: ID!
    image(spec: Spec!): Image!
    teamId: ID
    eventId: ID
    playerId: ID
  }

  input Spec {
    width: Int!
    height: Int!
    watermark: Boolean!
  }
`

export const resolver = ({
  ImageQuery
}) => ({
  image: (...args) => ImageQuery.get(...args),
})

export const query = ({ photoService }) => ({
  getById: (parent, { ids }, context, info) => {
    return photoService.getById({ ids })
  },

  getByTeam: (parent, { teamId }, context, info) => {
    return photoService.getByTeam({ teamId })
  },

  getByPlayer: (parent, { playerId }, context, info) => {
    return photoService.getByPlayer({ playerId })
  },

  getByEvent: async (parent, { eventId }, context, info) => {
    return photoService.getByEvent({ eventId })
  }
})

export const mutation = ({ photoService }) => ({
  addPhotos: async (parent, { photos }, context, info) => {
    return photoService.addPhotos({ photos })
  }
})

export default {
  typeDefs,
  resolver,
  query,
  mutation
}
