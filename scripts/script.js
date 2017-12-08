
// calculate .photoPreview height and resize it when window resizes
function getPreviewHeight () {
    return innerWidth/1920*100;
}

window.addEventListener("load",function(){
  var height = getPreviewHeight();
  document.getElementById('photoPreview').style.fontSize=height+"%";
})

window.addEventListener("resize",function(){
  var height = getPreviewHeight();
  document.getElementById('photoPreview').style.fontSize=height+"%";
})
