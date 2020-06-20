const selectRandomMovies = require('./selectRandomMovies');

test('selectRandomMovies should return the right number of values', () => {
  const movies = [{ id: 10 }, { id: 11 }, { id: 12 }];

  expect(selectRandomMovies(movies, 0).length).toBe(0);
  expect(selectRandomMovies(movies, 1).length).toBe(1);
  expect(selectRandomMovies(movies, 2).length).toBe(2);
  expect(selectRandomMovies(movies, 3).length).toBe(3);
  expect(selectRandomMovies(movies, 4).length).toBe(3);
});

test('selectRandomMovies should throw an error if random value is negative', () => {
  const movies = [{ id: 10 }, { id: 11 }, { id: 12 }];

  expect(() => selectRandomMovies(movies, -1)).toThrowError('numberOfMoviesToRetreive should be greater than 0');
});

test('selectRandomMovies should return the right content', () => {
  const movies = [{ id: 10 }, { id: 11 }, { id: 12 }];

  const random = 2;
  const results = selectRandomMovies(movies, random);

  // check results
  const resultsIds = results.reduce((acc, result) => {
    acc.push(result.id);
    return acc;
  }, []);
  let includedResultNumber = 0;

  movies.forEach((movie) => {
    if (resultsIds.includes(movie.id)) {
      includedResultNumber += 1;
    }
  });
  expect(includedResultNumber).toBe(random);
});
