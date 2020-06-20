const isActorInMovie = require('./isActorInMovie');

describe('isActorInMovie', () => {
  test('find actor if actor is in the movie', () => {
    const movie = {
      cast: [
        { name: 'actorName1' },
        { name: 'actorName2' },
      ],
    };
    expect(isActorInMovie(movie, { name: 'actorName1' })).toBe(true);
    expect(isActorInMovie(movie, { name: 'actorName2' })).toBe(true);
  });

  test('Dont find actor if actor is not in the movie', () => {
    const movie = {
      cast: [
        { name: 'actorName1' },
        { name: 'actorName2' },
      ],
    };
    expect(isActorInMovie(movie, { name: 'actorName3' })).toBe(false);
  });
});
