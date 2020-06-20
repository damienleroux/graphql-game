const request = require('superagent');
const mock = require('superagent-mocker')(request);

const getMovieByCategory = require('./getMovieByCategory');

test('getMovieByCategory should return expected values', async () => {
  const movies = [{ id: 10 }, { id: 11 }, { id: 12 }];

  const apiKey = process.env.THEMOVIEDB_API_KEY;
  const category = 'popular';
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;

  mock.get(url, () => ({
    body: {
      results: movies,
    },
  }));

  const getMovieByCategoryToTest = getMovieByCategory(request);
  const results = await getMovieByCategoryToTest(category);
  expect(results).toBe(movies);
});
