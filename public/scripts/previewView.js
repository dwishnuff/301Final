//JQUERY change for radio buttons on preview.HTML
//think about using iframe html in order to change one aspect of your code.
$('input[type=radio]').change(function(e) {
  console.log(e.target.value);
  $('#prettyPreview').contents().find('link[rel="stylesheet"]').attr("href",`styles/templates/${e.target.value}.css`);


})
