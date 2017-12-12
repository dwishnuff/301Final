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
<<<<<<< HEAD
  });
=======


   });
>>>>>>> 2a6497aeb77e950c2d11ea6a30ccbb065aa36f81


//search icon, select icon, select operator, repeat.  Add link. Message.
