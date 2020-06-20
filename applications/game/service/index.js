const getRandomPopularMovies = require('./movie/getRandomPopularMovies');

module.exports.getService = (request) => ({
  getRandomPopularMovies: getRandomPopularMovies(request),
});
