const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLError,
} = require('graphql');

const MovieType = require('../type/MovieType');
const MovieCategoryType = require('../type/MovieCategoryType');

module.exports = {
  type: new GraphQLList(MovieType),
  args: {
    category: {
      type: new GraphQLNonNull(MovieCategoryType),
    },
    random: {
      type: GraphQLInt,
    },
  },
  resolve: (parent, args, context) => {
    if (args.random && (args.random < 1 || args.random > 20)) {
      throw new GraphQLError('argument "random" should be between 1 and 20');
    }

    return context.service.getMovieByCategory(args.category, args.random);
  },
};
