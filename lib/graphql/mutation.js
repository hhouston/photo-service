import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    login(credentials: LoginInput!): String
    purchase(input: PurchaseInput!): String

    addTeam(team: TeamInput!): String
    updateTeam(team: UpdateTeamInput!): String

    addPhotos(photos: PhotosInput!): String
  }
`

export const resolvers = ({
  UserMutation,
  TeamMutation,
  PhotoMutation
}) => ({
  login: (...args) => UserMutation.login(...args),
  purchase: (...args) => UserMutation.purchase(...args),

  addTeam: (...args) => TeamMutation.addTeam(...args),
  updateTeam: (...args) => TeamMutation.updateTeam(...args),

  addPhotos: (...args) => PhotoMutation.addPhotos(...args),
})

export default {
  typeDefs,
  resolvers
}
