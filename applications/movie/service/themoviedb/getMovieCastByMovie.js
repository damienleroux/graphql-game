module.exports = (request) => (movieId) => {
  const apiKey = process.env.THEMOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  return request
    .get(url)
    .set('Accept', 'application/json')
    .then((res) => res.body && res.body.cast)
    .catch((err) => {
      // @todo: Should trigger a proper throw to be catch by server at the end.
      // eslint-disable-next-line no-console
      console.error(err);
      return [];
    });
};
