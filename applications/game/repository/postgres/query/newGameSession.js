module.exports = (conn) => async () => {
  const query = `
    INSERT INTO game_session(status) 
    VALUES('IN_PROGRESS')
    RETURNING id, status;
  `;
  const response = await conn.query(query);
  const row = response.rows[0];
  return {
    id: row.id,
    status: row.status,
  };
};
