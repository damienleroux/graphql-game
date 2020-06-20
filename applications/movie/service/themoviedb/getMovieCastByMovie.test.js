const request = require('superagent');
const mock = require('superagent-mocker')(request);

const getMovieCastByMovie = require('./getMovieCastByMovie');

test('getMovieCastByMovie should return expected values', async () => {
  const actors = [{ id: 10 }, { id: 11 }, { id: 12 }];

  const apiKey = process.env.THEMOVIEDB_API_KEY;
  const movieId = '1';
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  mock.get(url, () => ({
    body: {
      cast: actors,
    },
  }));

  const getMovieCastByMovieToTest = getMovieCastByMovie(request);
  const results = await getMovieCastByMovieToTest(movieId);

  expect(results).toBe(actors);
});
