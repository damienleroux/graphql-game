const request = require('superagent');
const express = require('express');
const expressMiddleware = require('./repository/graphql/expressMiddleware');
const themoviedbService = require('./service/themoviedb');

async function start() {
  const service = themoviedbService(request);

  const hostname = process.env.SERVER_HOSTNAME;
  const port = process.env.SERVER_PORT;

  const app = express();

  app.use('/graphql', expressMiddleware(service));

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

start();
