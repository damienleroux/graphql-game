const newGame = require('./newGame');
const submitGameAnwser = require('./submitGameAnwser');

module.exports.getUseCase = (repository, service) => ({
  newGame: newGame(repository, service),
  submitGameAnwser: submitGameAnwser(repository),
});
