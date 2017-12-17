var messageLoad = function(callback) {
  var greetingID=localStorage.getItem("greeting_id")
  $.get(`/meyou/${greetingID}`)
  .then(
    function(results) {
      if(results.template_css === '' || results.template_css === null){
        $('link[rel=stylesheet]').attr('href', 'styles/style.css');

      }
      else{

      $('link[rel=stylesheet]').attr('href', results.template_css);

    }

      console.log(results);
      var template = $('#display-template').html();
      console.log(template);

      // Compile the template data into a function
      var templateScript = Handlebars.compile(template);

      //
      var content=results.messages.reduce((html,pairs)=> html+templateScript(pairs),"");
      console.log(content);
      $("#photoPreview").append(content);
      var greetingtemplate = $('#greeting-template').html();

      // Compile the template data into a function
      var greetingtemplateScript = Handlebars.compile(greetingtemplate);
      var greetingContent = greetingtemplateScript(results)
      // Insert the HTML code into the page}

      $("#greetingDisplay").append(greetingContent);

    }


)
};
