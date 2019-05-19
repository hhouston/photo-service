import gql from 'graphql-tag'

export const typeDefs = gql`
  input CouponInput {
    code: ID!
    teamId: ID
    eventId: ID
  }

  type Coupon {
    id: ID
    code: ID!
    teamId: ID
    eventId: ID
  }
`

export const query = ({ couponService }) => ({
  getCoupons: async (parent, args, context, info) => {
    return couponService.get()
  }
})

export const mutation = ({ couponService }) => ({
  addCoupon: async (parent, { coupon }, context, info) => {
    return couponService.add({ coupon })
  }
})

export default {
  typeDefs,
  query,
  mutation
}
