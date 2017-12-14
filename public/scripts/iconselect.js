$('#searchForm').submit((event)=>{
  event.preventDefault();
  const userInput=$('input[name="search"]').val();
  $.post('/searchIcons', { searchTerm: userInput})
  .then(icons=>{
    icons.forEach((icon)=>{
      console.log(icon.preview_url)
      $(`<img src="${icon.preview_url}">`).click(recordIconClick).appendTo('#photoSelector');
    });
  });
});


//var to hold SelectedOptions
var message = [];

var iconClicked
var operatorClicked



//onClick event to highlight clicked icon
function recordIconClick(event) {
  iconClicked = event.target.getAttribute("src");
  event.target.classList.add("onClick");

}

//Select Operator
function recordOperatorClick(event) {
  operatorClicked = event.target.innerText; //How do we identify what this is being applied to?
  event.target.classList.add("onClick");

};
//Add to Message

function addToMessage(event) {
  var newPair = {
    iconURL: iconClicked,
    operator: operatorClicked
  };
  message.push(newPair)
  //reset #searchForm to initial values
  $("#photoSelector").empty();
  $("#horizontal-list .onClick").removeClass("onClick")
  $("#photoPreview").empty();
  operatorClicked="";
  iconClicked="";
  addtoPage ();
};

$("#iconAdd").click(addToMessage);


//compile handlebars template
// message.prototype.toHtml = function() {
//   //handlebars template:
//   const templateFiller = Handlebars.compile($('#message-template').html());
//
//   return templateFiller(this);
//
// };

// Retrieve the template data from the HTML (jQuery is used here).

function addtoPage () {
var template = $('#message-template').html();

// Compile the template data into a function
var templateScript = Handlebars.compile(template);


console.log(message);
// html = 'My name is Ritesh Kumar. I am a developer.'
var content=message.reduce((html,pairs)=> html+templateScript(pairs),"");
console.log(content);
// Insert the HTML code into the page}
$("#photoPreview").append(content);
console.log($("#photoPreview").html());
};
