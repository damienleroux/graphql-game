const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql');
const ActorType = require('./ActorType');

module.exports = new GraphQLObjectType({
  name: 'MovieType',
  fields: {
    title: { type: GraphQLString },
    id: { type: GraphQLString },
    cast: {
      type: new GraphQLList(ActorType),
      resolve: (parent, args, context) => context.service.getMovieCastByMovie(parent.id),
    },
  },
});
