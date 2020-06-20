# graphQL Game

This repository aims to experiment [graphQL](https://graphql.org/) under a clean archi eco system. It contains 2 applications working together to create a game based on random movie data. My intents was to follow [clean archi principle](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [KISS principle](https://en.wikipedia.org/wiki/KISS_principle).

*Warning: This repository is a test and is not production ready.*

## Requirements

Please, make sure your environnement is set with:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- Node >= 12
- Get an API key from `themoviedb` [platform](https://developers.themoviedb.org/3/getting-started/authentication) to test this application. Then create the file `.env` with content:

```
THEMOVIEDBAPIKEY=<YOUR API TOKEN>
```

## Commands

### Install 

- Clone/Download this repository
- Run `sh ./install.sh` from within the clone repository

### Start

Run `sh ./start.sh` to deploy Docker containers and then play with the deployed apps. 

### Test

Run `sh ./test.sh` to run unit tests. It doesn't require dockerized containers

## Architecture

This respository simulates a micro service architecture with 2 applications:

- `movie`: handling movie data through a tiers party : [themoviedb](https://www.themoviedb.org/?language=fr-FR)
- `game`: to create game based on movie data.

When the application is started, both applications can be reached from outside:

- `movie` on `http://localhost:8082/graphql`
- `game` on `http://localhost:8083/graphql`

## Playing with it.

### movie

When applications are running, you can test `movie` on `http://localhost:8082/graphql` with this kind of payload: 

```graphQl
query {
  movies (category: POPULAR, random: 2) {
    title,
    id,
    cast {
      name
      character
    }
  }
}
```

As a result, you'll obtain `2` random movies with the casting of each one:

```json
{
  "data": {
    "movies": [
      {
        "title": "Bleeding Steel",
        "id": "460648",
        "cast": [
          {
            "name": "Jackie Chan",
            "character": "Lin Dong"
          },
          {
            "name": "Show Lo",
            "character": "Leeson"
          },
          ...
        ]
      },
      {
        "title": "Raging Bull",
        "id": "1578",
        "cast": [
          {
            "name": "Robert De Niro",
            "character": "Jake LaMotta"
          },
          {
            "name": "Joe Pesci",
            "character": "Joey LaMotta"
          },
          ...
        ]
      }
    ]
  }
}
```
### game

When applications are running, you can test `game` on `http://localhost:8083/graphql` with this kind of payload: 

```graphQl
mutation {
  startGame {
    session {
      id,
      status
    },
    quizz {
      actorName
      movieName
    }
  }
}
```

This will create a new game with a quizz. The goal is to find if the given actor had a role in the movie.

As a result, you'll obtain:

```json
{
  "data": {
    "startGame": {
      "session": {
        "id": 1
      },
      "quizz": {
        "actorName": "John Witherspoon",
        "movieName": "Boomerang"
      }
    }
  }
}
```

Then, if you submit `true` (aka, the player answer is "actor has played in the movie") on game session `1`:

```graphQl
mutation {
  submitGame (id:1, answer: true) 
}
```

You'll get:

```json
{
  "data": {
    "submitGame": "WIN"
  }
}
```

## improvements

[] add a random complexz string as unique game session `id` to avoid game hacking
[] Add a `score` application to handle game results
[] Create a client within the `movie` application to be used by `game` application. This requires to publish the client as an `npm` module. This will ensure to abstract the transport layer from `game` application
[] Use TypeScript to let the `routes` and `usecase` implement the `repository` and `service` requested interface. Cf. hexagonal archi
[] Use Lerna to ease dependency management
[] Improve test coverage. For now, this repository is not for production purpose.