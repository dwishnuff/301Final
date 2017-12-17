//JQUERY change for radio buttons on preview.HTML
//think about using iframe html in order to change one aspect of your code.
$('input[type=radio]').change(function(e) {
  console.log(e.target.value);
  $('#prettyPreview').contents().find('link[rel="stylesheet"]').attr("href",`styles/templates/${e.target.value}.css`);

})
//lab 8 server.js $.put(/articles) example follow that, you'll want to update your table with the templace_css.
//use JQuery.post([settings])
//save the result to the database on preview.html.
$.post('/meyou', function(request, response){
  console.log()

  client.query(
    `UPDATE greeting
    SET
    templace_css=$1`
    [..
      request.body.templace_css
    ]
  ).then(function(){
    response.send('update complete')
  })
  .catch(function(err){
    console.error(err);
  });
});


//use JQuery.get([settings])
//load the result that was saved in message.html.

$.get('/meyou', function(request, response){
  client.query('SELECT template_css FROM greeting')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
},)
