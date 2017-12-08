
const conString = ''; //constring to connect to

const client = new pg.Client(conString); //create new client that will connect with postgres.

client.connect(); //connecting method.


function loadDB() {
  client.query(`
CREATE TABLE IF NOT EXISTS
  id INTEGER AUTOINCREMENT,
  message_id SERIAL PRIMARY KEY,
  img_source VARCHAR(255),
  operator VARCHAR(255),
  position INTEGER,
    `) //creating table with properties and values.
};

loadDB(); //calling table.
