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
};

$("#iconAdd").click(addToMessage);


//search icon, select icon, select operator, repeat.  Add link. Message.
