import gql from 'graphql-tag'

export const typeDefs = gql`
  type Mutation {
    login(credentials: LoginInput!): String
    purchase(input: PurchaseInput!): String

    addCoupon(coupon: CouponInput!): Coupon

    addTeam(team: TeamInput!): String
    updateTeam(team: UpdateTeamInput!): String

    addPhotos(photos: PhotosInput!): String

    addEvent(event: EventInput!): Event
  }
`

export const resolvers = ({
  UserMutation,
  CouponMutation,
  TeamMutation,
  EventMutation,
  PhotoMutation
}) => ({
  login: (...args) => UserMutation.login(...args),
  purchase: (...args) => UserMutation.purchase(...args),

  addCoupon: (...args) => CouponMutation.addCoupon(...args),

  addTeam: (...args) => TeamMutation.addTeam(...args),
  updateTeam: (...args) => TeamMutation.updateTeam(...args),

  addPhotos: (...args) => PhotoMutation.addPhotos(...args),

  addEvent: (...args) => EventMutation.addEvent(...args)
})

export default {
  typeDefs,
  resolvers
}
