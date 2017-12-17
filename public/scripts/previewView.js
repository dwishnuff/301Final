//JQUERY change for radio buttons on preview.HTML
//think about using iframe html in order to change one aspect of your code.
$('input[type=radio]').change(function(e) {
  console.log(e.target.value);
  $('#prettyPreview').contents().find('link[rel="stylesheet"]').attr("href",`styles/templates/${e.target.value}.css`);

})
//use JQuery.post([settings])
//save the result to the database on preview.html.
// $.post(url, [data], [callback],[type] )


//use JQuery.get([settings])
//load the result that was saved in message.html.

$.get('/meyou', function(request, response){
client.query('SELECT template_css FROM meyou')

}, [success], [dataType])
