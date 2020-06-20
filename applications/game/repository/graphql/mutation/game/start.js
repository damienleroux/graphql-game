const GameType = require('../../types/GameType');

module.exports = {
  type: GameType,
  resolve(parent, args, context) {
    return context.useCase.newGame();
  },
};
