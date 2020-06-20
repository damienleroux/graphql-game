const {
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const GameType = require('../types/GameType');

module.exports = {
  type: GameType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(parent, args, context) {
    return context.repository.findGame(args.id);
  },
};
