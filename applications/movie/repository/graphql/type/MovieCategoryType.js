const {
  GraphQLEnumType,
} = require('graphql');

module.exports = new GraphQLEnumType({
  name: 'MovieCategoryType',
  values: {
    POPULAR: { value: 'popular' },
  },
});
