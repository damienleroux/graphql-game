const {
  GraphQLObjectType,
} = require('graphql');
const GameSessionType = require('./GameSessionType');
const GameQuizzType = require('./GameQuizzType');

module.exports = new GraphQLObjectType({
  name: 'GameType',
  fields: {
    session: { type: GameSessionType },
    quizz: { type: GameQuizzType },
  },
});
