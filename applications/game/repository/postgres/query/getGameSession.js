module.exports = (conn) => async (gameId) => {
  const query = `
    SELECT status
    FROM game_session 
    WHERE id = $1;
  `;

  const response = await conn.query(query, [gameId]);
  const row = response.rows[0];
  return {
    id: gameId,
    status: row.status,
  };
};
