/**
 * Returns X random movies through a list of movies
 * @param {*} movies a list of movies
 * @param {*} numberOfRandomMovies the random number of movie to retreive within movies
 */
module.exports = (movies, numberOfRandomMovies) => {
  if (numberOfRandomMovies < 0) {
    throw new Error('numberOfMoviesToRetreive should be greater than 0');
  }

  // Optim
  if (numberOfRandomMovies === movies.length) {
    return movies;
  }

  // Available index with the movie array
  const moviesAvailableIndexes = [...Array(movies.length).keys()];

  // Make sure we limit random results to number of results
  let numberOfMoviesToRetreive = Math.min(numberOfRandomMovies, moviesAvailableIndexes.length);

  const randomResults = [];
  while (numberOfMoviesToRetreive > 0) {
    const randomIndex = Math.floor(Math.random() * numberOfMoviesToRetreive);
    randomResults.push(movies[moviesAvailableIndexes[randomIndex]]);
    moviesAvailableIndexes.splice(randomIndex, 1);
    numberOfMoviesToRetreive -= 1;
  }
  return randomResults;
};
