
const conString = '';

function loadDB() {
  client.query(`
CREATE TABLE IF NOT EXISTS
  id INTEGER AUTOINCREMENT,
  message_id SERIAL PRIMARY KEY,
  img_source VARCHAR(255),
  operator,
  position INTEGER,
    `)


};
