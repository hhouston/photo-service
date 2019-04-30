import gql from 'graphql-tag'

export const typeDefs = gql`
  input PhotosInput {
    files: [Upload!]!
    orgId: String
    teamId: String
    eventId: String
  }

  input PhotoInput {
    name: String!
    path: String!
    type: String!
  }

  type PhotoOutput {
    idea: String!
    url: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
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

const processUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload
  console.log('filename: ', filename);
  const stream = createReadStream()
  const { id, path } = await storeFS({ stream, filename })
  // return storeDB({ id, filename, mimetype, path })
}

export const mutation = ({ photoService }) => ({
  addPhotos: async (parent, { photos }, context, info) => {
      console.log('photozzzzz: ', photos)
      return photoService.addPhotos({ photos })
  },

  uploadFile: async (parent, { file }, context, info) => {
    console.log('file in photo gql', await file);
    await processUpload(file)
    // const { stream, filename, mimetype, encoding } = await file

    console.log('stream', stream);
    // 1. Validate file metadata.

    // 2. Stream file contents into cloud storage:
    // https://nodejs.org/api/stream.html

    // 3. Record the file upload in your DB.
    // const id = await recordFile( … )

    return { filename, mimetype, encoding }
}
})

export default {
  typeDefs,
  query,
  mutation
}
