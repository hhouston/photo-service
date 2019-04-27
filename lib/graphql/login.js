import gql from 'graphql-tag'

export const typeDefs = gql`
  input LoginInput {
    email: String!
    coupon: String!
  }
`

export const mutation = ({ loginUser }) => ({
  login: async (parent, { credentials }, context, info) => {
      return loginUser(credentials)
  }
})

export default {
  typeDefs,
  mutation
}
