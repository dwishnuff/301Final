
const pg = require('pg');
const fs = require('fs');
const dbcon = require("dbConnection.js");


const client = new pg.Client(dbcon.conString);

client.connect(); //connecting method.

function loadGreeting() {
  fs.readFile('./data/me+you_data.json',(err, fd) => {
    JSON.parse(fd.toString()).forEach((ele) => {
      client.query(
        `INSERT INTO greeting(email, greeting_message)
        VALUES ($1, $2) RETURNING greeting_id;`,
        [ele.email, ele.greeting_message])
        .then(res => {
          console.log('new record id', res.rows[0].greeting_id);
          return res.rows[0].greeting_id;
        })
        .then(id => {
          // client.query(`
          //   INSERT INTO message (greeting_id, img_source, operator, position)
          //   VALUES ($1, $2, $3, $4)`,
          //   [id, ele.messages.img_source, ele.messages.operator, ele.messages.position])
          ele.messages.forEach(message => loadMessage(id, message));
          })
          .catch(err => console.log(err));
        })

      })

    }

    function loadMessage(greeting_id, message) {
      client.query(`
        INSERT INTO message (greeting_id, img_source, operator, position)
        VALUES ($1, $2, $3, $4)`,
        [greeting_id, message.img_source, message.operator, message.position]);
      }



      function loadDB() {
        client.query(`
          CREATE TABLE IF NOT EXISTS greeting (
            greeting_id SERIAL PRIMARY KEY,
            email VARCHAR(255),
            url VARCHAR(255),
            greeting_message VARCHAR(255)
          );
          `).then(() => loadGreeting())
          .catch(err => console.log(err));

          client.query(`
            CREATE TABLE IF NOT EXISTS message (
              message_id SERIAL PRIMARY KEY,
              greeting_id INTEGER NOT NULL REFERENCES greeting(greeting_id),
              img_source VARCHAR(255) NOT NULL,
              operator VARCHAR(255),
              position INTEGER NOT NULL);
              `) //creating table with properties and values.
              // .then(() => loadPreview())
              .catch(err => console.log(err)); //will catch an error and return it.

            };

            loadDB(); //calling table.
