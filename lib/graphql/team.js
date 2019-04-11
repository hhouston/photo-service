import gql from 'graphql-tag'

const Team = gql`
  type Team {
    id: String!
    name: String!
    thumbnail: String!
    roster: [String!]
  }
`


const Player = gql`
  type Player {
    id: String!
    name: String
    number: String
    thumbnail: Photo
    info: String
  }
`

export const typeDefs = () => () => [
  Team,
  Player
]

export const query = ({ teamService }) => ({
  getTeams: (parent, { orgId }, context, info) => {
    return teamService.getTeamsByOrganization({ orgId })
  }
})

export default {
  typeDefs,
  query
}
