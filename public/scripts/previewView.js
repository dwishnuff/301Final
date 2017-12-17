//JQUERY change for radio buttons on preview.HTML
//think about using iframe html in order to change one aspect of your code.
var greetingID=localStorage.getItem("greeting_id");
$('#goToMessage').on('click', function() {window.location.href=`/message.html?id=${greetingID}`});

$('#prettyPreview').attr('src', `/message.html?id=${greetingID}`);

$('input[type=radio]').change(function(e) {
  console.log(e.target.value);
  $('#prettyPreview').contents().find('link[rel="stylesheet"]').attr("href",`styles/templates/${e.target.value}.css`);
  $('#photoPreview').contents().find('link[rel="stylesheet"]').attr("href",`styles/templates/${e.target.value}.css`);
})
//lab 8 server.js $.put(/articles) example follow that, you'll want to update your table with the templace_css.
//use JQuery.post([settings])
//save the result to the database on preview.html.
$('#pick-template').submit(function(e) {
  e.preventDefault();
  var data = {
    greeting_id:greetingID,
    template_css:  $('#prettyPreview').contents().find('link[rel="stylesheet"]').attr("href")
  }
  console.log(data)
  $.ajax({
    url:'/meyou',
    method:'PUT',
    data:data
  }).done(function(response){
    if(response === 'update complete')
    {
      console.log("template saved");

    }
  })
});

//use JQuery.get([settings])
//load the result that was saved in message.html.

// $.get('/meyou', function(request, response){
//   client.query('SELECT template_css FROM greeting')
//   .then(function(result) {
//     response.send(result.rows);
//   })
//   .catch(function(err) {
//     console.error(err)
//   })
// },)
