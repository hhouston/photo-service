import gql from 'graphql-tag'

export const typeDefs = gql`
  type Test {
    id: String
  }
`

export const query = ({ stripeService }) => ({
  charge: (parent, { tokenId }, context, info) => {
    return stripeService.charge({ tokenId })
  }
})

export default {
  typeDefs,
  query
}
