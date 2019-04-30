import gql from 'graphql-tag'

export const typeDefs = gql`
  type Team {
    id: String!
    name: String!
    thumbnail: String
    roster: [Player!]
  }

  input TeamInput {
    name: String!
    roster: [PlayerInput!]
  }

  input PlayerInput {
    name: String
    number: String
    info: String
  }

  type Player {
    name: String
    number: String
    thumbnail: Image
    info: String
  }
`

export const query = ({ teamService }) => ({
  getTeams: (parent, args, context, info) => {
    return teamService.getTeams()
  }
})

export const mutation = ({ teamService }) => ({
  addTeam: (parent, { team }, context, info) => {
    return teamService.addTeam({ team })
  }
})

export default {
  typeDefs,
  mutation,
  query
}
