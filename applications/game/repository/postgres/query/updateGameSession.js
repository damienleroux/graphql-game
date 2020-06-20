module.exports = (conn) => async (gameId, status) => {
  const query = `
    UPDATE game_session
    SET status = $2
    WHERE id = $1;
  `;
  await conn.query(query, [gameId, status]);
};
