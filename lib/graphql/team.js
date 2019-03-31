export const typeDef = `
  type Team {
    id: String!
    name: String!
  }
`

export const resolvers = {
  teams: () => {
    return [
      {
        id: '1',
        name: 'Riptide'
      }
    ]
  }
}

// export const query = () => ({
//   getAll: (parent, args, context, info) => {
//     return 'Teams Query'
//   }
// })
