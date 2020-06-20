const getMovieByCategory = require('./getMovieByCategory');
const getMovieCastByMovie = require('./getMovieCastByMovie');

module.exports = (request) => ({
  getMovieByCategory: getMovieByCategory(request),
  getMovieCastByMovie: getMovieCastByMovie(request),
});
