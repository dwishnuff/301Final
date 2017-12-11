

const pg = require('pg');
const fs = require('fs');
const dbcon = require("./dbConnection.js");
const express = require('express');//using express


console.log(dbcon.conString);
const client = new pg.Client(dbcon.conString);

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

client.connect(); //connecting method.

//middleware plugins that tell app to use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

//request HTML resources using app.get
// app.get('', function(request, response){
//
//   response.sendFile('',{root: './public'});
// });

app.get('/meyou', function (request, response) {

  client.query('SELECT * FROM greeting INNER JOIN message ON greeting_id = ')
  .then(function(result){
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  });
});

// app.post('/meyou', function(request, response) {})

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});

//database loaders
const NounProject = require('the-noun-project'),
nounProject = new NounProject({
    key: '3e46b66b4dfd49129debc620f11902fe',
    secret: '2023bb32e9774e10a91740bb0c115adb'
});

app.post('/searchIcons', function(request, response){
  console.log(request.body.searchTerm)
  nounProject.getIconsByTerm(request.body.searchTerm, {limit: 10}, function (err, data) {
      if (err) console.log(err);
      response.send(data.icons);
      console.log(data.icons)
      // $.each(data.icons, (icon)=>{
      //   $('#photoSelector').append(`<img src="${icon.preview_url}">`);
      });
});

function loadGreeting() {
  fs.readFile('./public/data/me+you_data.json',(err, fd) => {
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
