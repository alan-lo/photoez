$(document).ready(function() {
  $('#create-album-btn').on('click', function(){
    const albumName =$('#album-name-create');
    $.post("/albums/create", {name: albumName.val()} , function(response, status){
        if (response.redirect) {
          window.location.href = response.redirectURL;
        }else{
        albumName.val('');
        if ((albumName.parent().children().length) == 1)
          albumName.parent().append(`<div class="alert alert-danger">${response.msg}</div>`)
        }
    });
  })

  $('#destroy-album-btn').on('click', function(){
    const albumName =$('#album-name-destroy');
    $.post("/albums/delete", {name: albumName.val()} , function(response, status){
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
     const albumName =$('#album-name-create');
     if (albumName.siblings().length > 0 ){
      albumName.siblings().remove();
     }
  })

  $('#destroy-album-modal').on('hidden.bs.modal', function (event) {
     const albumName =$('#album-name-destroy');
     if (albumName.siblings().length > 0 ){
      albumName.siblings().remove();
     }
  })
})
