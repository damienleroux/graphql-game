const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'GameQuizzType',
  fields: {
    actorName: { type: GraphQLString },
    movieName: { type: GraphQLString },
  },
});
