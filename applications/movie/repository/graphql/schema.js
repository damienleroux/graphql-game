const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const query = require('./query');

// Create graphql schema. Base on service "interface"
// (@todo in the futur: use Typescript Interfaces)
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: query,
  }),
});
