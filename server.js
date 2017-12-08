
const pg = require('pg');

const conString = 'postgres://postgres:datadriver101@localhost:5432/meyou'; //constring to connect to

const client = new pg.Client(conString); //create new client that will connect with postgres.

client.connect(); //connecting method.


function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS greeting (
      greeting_id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      greeting_message VARCHAR(255)
    );
   `)
   .catch(err => console.log(err));

  client.query(`
CREATE TABLE IF NOT EXISTS message (
  message_id SERIAL PRIMARY KEY,
  greeting_id INTEGER NOT NULL REFERENCES greeting(greeting_id),
  img_source VARCHAR(255) NOT NULL,
  operator VARCHAR(255) NOT NULL,
  position INTEGER);
    `) //creating table with properties and values.
    .catch(err => console.log(err)); //will catch an error and return it.

};

loadDB(); //calling table.
