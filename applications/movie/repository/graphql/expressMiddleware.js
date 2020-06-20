const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

module.exports = (service) => graphqlHTTP({
  schema,
  graphiql: true, // true for test purpose
  context: { service },
});
