const newGame = require('./newGame');

describe('newGame', () => {
  test('check new game data when the expected answer is true', async () => {
    const expectedAnswer = true;
    const repository = {
      pg: {
        newGameSession: jest.fn(async () => ({
          id: 1,
          status: 'IN_PROGRESS',
        })),
        newGameQuizz: jest.fn(async () => { }),
      },
    };

    const service = {
      getRandomPopularMovies: jest.fn(async () => ([{
        title: 'titleName1',
        cast: [{ name: 'actorName1' }],
      }])),
    };

    const response = await newGame(repository, service, () => expectedAnswer)();
    expect(repository.pg.newGameQuizz.mock.calls.length).toBe(1);
    expect(repository.pg.newGameSession.mock.calls.length).toBe(1);
    expect(service.getRandomPopularMovies.mock.calls.length).toBe(1);
    // Only one random popular movie are required when expected answer is "true"
    expect(service.getRandomPopularMovies.mock.calls[0][0]).toBe(1);
    expect(response).toEqual({
      quizz: {
        actorName: 'actorName1',
        movieName: 'titleName1',
      },
      session: {
        id: 1,
        status: 'IN_PROGRESS',
      },
    });
  });

  test('check new game data when the expected answer is false', async () => {
    const expectedAnswer = false;
    const repository = {
      pg: {
        newGameSession: jest.fn(async () => ({
          id: 1,
          status: 'IN_PROGRESS',
        })),
        newGameQuizz: jest.fn(async () => { }),
      },
    };

    const service = {
      getRandomPopularMovies: jest.fn(async () => ([{
        title: 'titleName1',
        cast: [{ name: 'actorName1' }],
      }, {
        title: 'titleName2',
        cast: [{ name: 'actorName2' }],
      }])),
    };

    const response = await newGame(repository, service, () => expectedAnswer)();
    expect(repository.pg.newGameQuizz.mock.calls.length).toBe(1);
    expect(repository.pg.newGameSession.mock.calls.length).toBe(1);
    expect(service.getRandomPopularMovies.mock.calls.length).toBe(1);
    // Two random popular movies are required when expected answer is "false"
    expect(service.getRandomPopularMovies.mock.calls[0][0]).toBe(2);
    expect(response).toEqual({
      quizz: {
        actorName: 'actorName2',
        movieName: 'titleName1',
      },
      session: {
        id: 1,
        status: 'IN_PROGRESS',
      },
    });
  });
});
