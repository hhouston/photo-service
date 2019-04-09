const Team = `
  type Team {
    id: String!
    name: String!
    bannerUrl: String!
  }
`

export const typeDefs = () => () => [
  Team
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
