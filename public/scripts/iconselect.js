$('#searchForm').submit((event)=>{
  event.preventDefault();
  const userInput=$('input[name="search"]').val();
  nounProject.getIconsByTerm(userInput, {limit: 10}, function (err, data) {
      if (err) console.log(err);
      $.each(data.icons, (icon)=>{
        $('#photoSelector').append(`<img src="${icon.preview_url}">`);
      });
   });
})

//search icon, select icon, select operator, repeat.  Add link. Message.
