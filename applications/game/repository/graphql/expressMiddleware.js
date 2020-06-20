const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

module.exports = (useCase) => graphqlHTTP({
  schema,
  graphiql: true, // true for test purpose
  context: { useCase },
});
