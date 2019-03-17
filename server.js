var express = require('express');
import graphqlHTTP from 'express-graphql'
var { buildSchema } = require('graphql');
import cors from 'cors'
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String,
    hey: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello: ({ id }) => {
    return 'Hello world!';
  },
  hey: () => {
    return 'Hey world!';
  },
};

var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
