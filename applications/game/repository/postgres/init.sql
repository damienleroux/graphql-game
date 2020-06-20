--
-- Simple init sql file. migrate should be used as future improvement
-- 1 Domain is presented in this SQL schema
--

-- *************************************************
-- ****************** GAME DOMAIN ******************
-- *************************************************

-- GAME_SESSION STATUS
CREATE TYPE game_session_status AS ENUM('IN_PROGRESS', 'LOST', 'WIN');

-- GAME SESSION WHEN PLAYER START NEW GAME
CREATE TABLE game_session
(
  id SERIAL PRIMARY KEY,
  status game_session_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- GAME SESSION PLAYER CURRENT STEP
-- By design, only one quizz can be played at a time for a game session
-- As a result, there is only one row by game sessions
CREATE TABLE game_quizz
(
  game_session_id INTEGER PRIMARY KEY REFERENCES game_session(id) DEFERRABLE INITIALLY IMMEDIATE,
  is_matching BOOLEAN NOT NULL, -- TRUE if the actor represented by actor_id is playing within the movie referenced by movie_id
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);