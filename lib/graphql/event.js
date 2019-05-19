import gql from 'graphql-tag'

export const typeDefs = gql`
  input EventInput {
    name: String!
    location: String!
    date: String!
    teams: [ID!]
  }

  type Event {
    id: ID!
    name: String!
    location: String!
    date: String!
    teams: [ID!]
  }
`

export const query = ({ eventService }) => ({
  getEvents: async (parent, args, context, info) => {
    return eventService.getEvents()
  }
})

export const mutation = ({ eventService }) => ({
  addEvent: async (parent, { event }, context, info) => {
    return eventService.addEvent({ event })
  }
})

export default {
  typeDefs,
  query,
  mutation
}
