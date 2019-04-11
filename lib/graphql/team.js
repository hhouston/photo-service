const Team = `
  type Team {
    id: String!
    name: String!
    bannerUrl: String!
  }
`

const Player = `
  type Player {
    id: String!
    name: String
    number: String
    info: String
  }
`

export const typeDefs = () => () => [
  Team,
  Player
]

export const query = ({ teamService }) => ({
  getTeams: (parent, args, context, info) => {
    console.log('args: ', args);
    return teamService.getTeamsByOrganization()
  }
})

export default {
  typeDefs,
  query
}
