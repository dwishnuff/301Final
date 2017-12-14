
// calculate .photoPreview height and resize it when window resizes
function getPreviewHeight () {
    return innerWidth/1920*100;
}

function addResize () {
  window.addEventListener("load",function(){
  var height = getPreviewHeight();
  document.getElementById('photoPreview').style.fontSize=height+"%";
})

window.addEventListener("resize",function(){
  var height = getPreviewHeight();
  document.getElementById('photoPreview').style.fontSize=height+"%";
});
}
//script for loading share URL

function copyURL() {

  var url = document.location.href;


  new Clipboard('#copyButton', {
  text: function() {
    return url;
  }
});

document.getElementById("displayURL").value=url;
};

//load onClick event to operators on page load
$(document).ready(function(){
  $("#horizontal-list").on("click","li",recordOperatorClick);
})
