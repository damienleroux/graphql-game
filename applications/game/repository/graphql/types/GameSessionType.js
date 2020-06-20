const {
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');
const GameSessionStatusType = require('./GameSessionStatusType');

module.exports = new GraphQLObjectType({
  name: 'GameSessionType',
  fields: {
    id: { type: GraphQLInt },
    status: { type: GameSessionStatusType },
  },
});
