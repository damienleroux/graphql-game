module.exports = (conn) => async (gameId, expectedAnswer) => {
  const query = `
    INSERT INTO game_quizz(game_session_id, is_matching) 
    VALUES($1, $2);
  `;
  await conn.query(query, [gameId, expectedAnswer]);
};
