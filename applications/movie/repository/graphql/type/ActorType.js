const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ActorType',
  fields: {
    name: { type: GraphQLString },
    character: { type: GraphQLString },
  },
});
