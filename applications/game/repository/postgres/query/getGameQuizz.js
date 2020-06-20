module.exports = (conn) => async (gameId) => {
  const query = `
    SELECT is_matching
    FROM game_quizz
    WHERE game_session_id = $1;
  `;
  const response = await conn.query(query, [gameId]);
  const row = response.rows[0];
  return {
    id: gameId,
    isMatching: row.is_matching,
  };
};
