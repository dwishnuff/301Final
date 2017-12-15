var messageLoad = function(callback) {
  var greetingID=localStorage.getItem("greeting_id")
  $.get(`/meyou/${greetingID}`)
  .then(
    function(results) {
      var template = $('display-template').html();

      // Compile the template data into a function
      var templateScript = Handlebars.compile(template);

      //
      var content=results.messages.reduce((html,pairs)=> html+templateScript(pairs),"");
      $("#messageDisplay").append(content);
      var greetingtemplate = $('greeting-template').html();

      // Compile the template data into a function
      var greetingtemplateScript = Handlebars.compile(greetingtemplate);
      var greetingContent = greetingtemplateScript(results)
      // Insert the HTML code into the page}

      $("#greetingDisplay").append(content);

    }


)
};
