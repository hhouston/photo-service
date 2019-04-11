const Team = `
  type Team {
    id: String!
    name: String!
    thumbnail: Photo
  }
`

const Player = `
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
  getTeams: (parent, args, context, info) => {
    return teamService.getTeamsByOrganization()
  }
})

export default {
  typeDefs,
  query
}
