const typeDef = `
  type Photo {
    id: String!
    url: String!
  }
`

export const resolver = {
  getAll: (parent, args, context, info) => {
    return [
      {
        id: '1',
        url: '1'
      },
      {
        id: '2',
        url: '2'
      },
      {
        id: '3',
        url: '3'
      }
    ]
  },

  getByTeam: (parent, args, context, info) => {
    return [
      {
        id: '1',
        url: '1'
      },
      {
        id: '3',
        url: '3'
      }
    ]
  }
}

export default {
  typeDef
}
