const selectRandomMovies = require('./utils/selectRandomMovies');

const THEMOVIEDB_MAX_POPULAR_PAGE = 500;

module.exports = (request) => (category, random) => {
  const apiKey = process.env.THEMOVIEDB_API_KEY;
  let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;

  if (random) {
    const randomPageIndex = Math.ceil(Math.random() * THEMOVIEDB_MAX_POPULAR_PAGE);
    url += `&page=${randomPageIndex}`;
  }

  return request
    .get(url)
    .set('Accept', 'application/json')
    .then((res) => {
      const results = res.body && res.body.results;
      if (!random) {
        return results;
      }
      return selectRandomMovies(results, random);
    })
    .catch((err) => {
      // @todo: Should trigger a proper throw to be catch by server at the end.
      // eslint-disable-next-line no-console
      console.error(err);
      return [];
    });
};
