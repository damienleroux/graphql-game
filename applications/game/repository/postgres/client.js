const newGameSession = require('./query/newGameSession');
const getGameSession = require('./query/getGameSession');
const updateGameSession = require('./query/updateGameSession');

const newGameQuizz = require('./query/newGameQuizz');
const getGameQuizz = require('./query/getGameQuizz');

const newPool = require('./newPool');

module.exports.new = () => {
  const postgresPool = newPool();
  return {
    // Game
    newGameSession: newGameSession(postgresPool),
    getGameSession: getGameSession(postgresPool),
    updateGameSession: updateGameSession(postgresPool),

    // Session
    newGameQuizz: newGameQuizz(postgresPool),
    getGameQuizz: getGameQuizz(postgresPool),
  };
};
