const hostname = process.env.MOVIE_HOSTNAME;
const port = process.env.MOVIE_PORT;

module.exports = (request) => (random) => {
  const query = `{
      movies(category:POPULAR, random:${random}){
        title,
        id,
        cast {
          name
        }
      }
    }`;
  return request
    .post(`http://${hostname}:${port}/graphql`)
    .set('Accept', 'application/json')
    .send({ query })
    .then((res) => res.body.data.movies)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      // @todo: transform as proper error class
      throw new Error('ERROR_MOVIE_CALL', query, err);
    });
};
