$(document).ready(function() {
  $('#create-album-btn').on('click', function(){
    const albumName =$('#album-name');
    $.post("/albums/create", {name: albumName.val()} , function(response, status){
        console.log(response);
        if (response.redirect) {
          window.location.href = response.redirectURL;
        }else{
        albumName.val('');
        if ((albumName.parent().children().length) == 1)
          albumName.parent().append(`<div class="alert alert-danger">${response.msg}</div>`)
        }
    });
  })

  $('#create-album-modal').on('hidden.bs.modal', function (event) {
   console.log('modal is hidden');
     const albumName =$('#album-name');
     if (albumName.siblings().length > 0 ){
      albumName.siblings().remove();
     }
  })

})
