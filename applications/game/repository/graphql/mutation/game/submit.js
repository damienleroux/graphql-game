const {
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const GameSessionStatusType = require('../../types/GameSessionStatusType');

module.exports = {
  type: GameSessionStatusType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    answer: {
      name: 'answer',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  resolve(parent, args, context) {
    return context.useCase.submitGameAnwser(args.id, args.answer);
  },
};
