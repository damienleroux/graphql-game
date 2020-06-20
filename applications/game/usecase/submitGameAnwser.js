module.exports = (repository) => async (gameId, answer) => {
  const { status } = await repository.pg.getGameSession(gameId);
  if (status !== 'IN_PROGRESS') {
    // @todo: To handle beautifully later (middleware + dedicated HTTP error class)
    throw new Error('UNPROCESSSABLE ENTITY');
  }

  const { isMatching } = await repository.pg.getGameQuizz(gameId);

  const gameResult = isMatching === answer ? 'WIN' : 'LOST';
  await repository.pg.updateGameSession(gameId, gameResult);
  return gameResult;
};
