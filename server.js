

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

  client.query('SELECT * FROM greeting INNER JOIN message ON message.greeting_id = greeting.greeting_id')
  .then(function(result){
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  });
});

app.post('/meyou', function(request, response) {
  console.log("### this is the console log for the message send to server.")
  console.log(request.body);
  client.query(
    `INSERT INTO greeting (url,greeting_message)
    VALUES ($1,$2) RETURNING greeting_id`,
    [request.body.url,request.body.greeting_message]
  ).then (function(result) {
    request.body.messages.forEach(function(item,index){
      client.query(
        `INSERT INTO message (greeting_id,img_source,operator,position)
        VALUES ($1,$2,$3,$4)`,
        [result.rows[0].greeting_id,item.iconURL,item.operator,index+1]
      ).then (function(){
        response.send({"greeting_id":result.rows[0].greeting_id});
      }).catch (function(error){
        console.log(error)
      })
    })
  })
})

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});

//database loaders
const NounProject = require('the-noun-project'),
nounProject = new NounProject({
    key: '3e46b66b4dfd49129debc620f11902fe',
    secret: '2023bb32e9774e10a91740bb0c115adb'
});

// app.post('')

app.post('/searchIcons', function(request, response){
  console.log(request.body.searchTerm)
  nounProject.getIconsByTerm(request.body.searchTerm, {limit: 10}, function (err, data) {
      if (err) console.log(err);
      response.send(data.icons);
      // console.log(data.icons)
      });
});

app.get('/meyou/:id', function(request, response) {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // #3; Article.prototype.updateRecord(); Update;
  client.query(
    `SELECT * FROM greeting WHERE greeting_id=$1;`,
    [
          request.params.id
    ]
  )
  .then(function(greetingResults) {

    client.query(
      `SELECT * FROM message WHERE greeting_id=$1;`,
      [
            request.params.id
      ]
    ).then(function(messageResults){
      let greeting=greetingResults.rows[0];
      greeting.messages=messageResults.rows;
      response.send(greeting);
    })
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.put('/meyou', function(request, reponse){
  client.query(
      `UPDATE greeting
      SET template_css=$1
      WHERE greeting_id = $2`,
      [
        request.body.template_css,
        request.body.greeting_id
      ]
    ).then(function(){
      response.send('update complete')
    })
    .catch(function(err){
      console.error(err);
    });

});

function loadGreeting() {
  fs.readFile('./public/data/me+you_data.json',(err, fd) => {
    JSON.parse(fd.toString()).forEach((ele) => {
      client.query(
        `INSERT INTO greeting(email, greeting_message, template_css, url)
        VALUES ($1, $2, $3, $4) RETURNING greeting_id;`,
        [ele.email, ele.greeting_message, ele.template_css, ele.url])
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
          greeting_message VARCHAR(255),
          template_css VARCHAR(255)

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
