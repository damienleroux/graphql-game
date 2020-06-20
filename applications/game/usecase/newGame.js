const isActorInMovie = require('./utils/isActorInMovie');

// 50% chances to have to answer Yes
// 50% chances to have to answer No
function getRandomExpectedAnswer() {
  return !(Math.random() < 0.5);
}

function getRandomActor(listOfActors) {
  const randomIndex = Math.floor(Math.random() * listOfActors.length);
  return listOfActors[randomIndex];
}

module.exports = (repository, service, getExpectedAnswer = getRandomExpectedAnswer) => async () => {
  const actorIsInTheMovie = getExpectedAnswer();

  // When the quizz answer is YES, two actors have to come from the same movie.
  // => 1 movie is retrieved only.
  // When the quizz answer is NO, two actors from differents movies are required
  // => 2 movies will be retrieved
  const numberOfRandomMoviesToRetrieve = actorIsInTheMovie ? 1 : 2;
  const randomMovies = await service.getRandomPopularMovies(numberOfRandomMoviesToRetrieve);

  // Select the casting from the right or wrong movie depending on the desired answer
  const targetCast = randomMovies[actorIsInTheMovie ? 0 : 1].cast;

  // Filter the casting:  we must ensure the answer is NO
  // Actually, one same actor could have played in two different movies
  // Two avoid this rare but possible case, we ensure to select an actor
  // in movie 2 that has no played in movie 1
  const filteredCast = actorIsInTheMovie
    ? targetCast
    : targetCast.filter((actor) => !isActorInMovie(randomMovies[0], actor));

  // persist this new game within db
  // @todo: Put all call to repository.pg in one transaction
  const { id, status } = await repository.pg.newGameSession();
  await repository.pg.newGameQuizz(id, actorIsInTheMovie);

  return {
    session: {
      id,
      status,
    },
    quizz: {
      movieName: randomMovies[0].title,
      actorName: getRandomActor(filteredCast).name,
    },
  };
};
