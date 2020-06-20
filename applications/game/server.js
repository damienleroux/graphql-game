const request = require('superagent');
const express = require('express');
const expressMiddleware = require('./repository/graphql/expressMiddleware');
const { getService } = require('./service');
const { getUseCase } = require('./usecase');
const { new: newPosgresClient } = require('./repository/postgres/client');

async function start() {
  const repository = {
    pg: newPosgresClient(),
  };

  const service = getService(request);

  const useCase = getUseCase(repository, service);

  const app = express();

  app.use('/graphql', expressMiddleware(useCase));

  const hostname = process.env.SERVER_HOSTNAME;
  const port = process.env.SERVER_PORT;

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

start();
