const {
  GraphQLEnumType,
} = require('graphql');

module.exports = new GraphQLEnumType({
  name: 'GameSessionStatusType',
  values: {
    IN_PROGRESS: { value: 'IN_PROGRESS' },
    LOST: { value: 'LOST' },
    WIN: { value: 'WIN' },
  },
});
