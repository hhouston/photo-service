import gql from 'graphql-tag'

export const typeDefs = gql`
  type Team {
    id: String!
    name: String!
    thumbnail: String!
    roster: [String!]
  }

  type Player {
    id: String!
    name: String
    number: String
    thumbnail: Photo
    info: String
  }
`

export const query = ({ teamService }) => ({
  getTeams: (parent, { orgId }, context, info) => {
    return teamService.getTeamsByOrganization({ orgId })
  }
})

export default {
  typeDefs,
  query
}
