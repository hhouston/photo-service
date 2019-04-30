import gql from 'graphql-tag'

export const typeDefs = gql`
  type Team {
    id: String!
    name: String!
    thumbnail: String!
    roster: [Player!]
  }

  input TeamInput {
    name: String!
    thumbnail: String!
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
  addTeam: (parent, { team }, context, info) => {
    return teamService.addTeam({ team })
  },

  getTeams: (parent, { orgId }, context, info) => {
    return teamService.getTeamsByOrganization({ orgId })
  },


})

export default {
  typeDefs,
  query
}
