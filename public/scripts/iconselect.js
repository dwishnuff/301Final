$('#searchForm').submit((event)=>{
  event.preventDefault();
  const userInput=$('input[name="search"]').val();
  $.post('/searchIcons', { searchTerm: userInput})
   .then(icons=>{
     icons.forEach((icon)=>{
       console.log(icon.preview_url)
      $('#photoSelector').append(`<img src="${icon.preview_url}">`);
      });
   })
  });


//search icon, select icon, select operator, repeat.  Add link. Message.
