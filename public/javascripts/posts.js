
let init = false;
let showAlbums = false;

$(document).ready(function() {
  $('.parent-container').magnificPopup({
    delegate: 'a',
    type:'image',
    gallery:{enabled:true}
    }
  );

  $('.post').on('mouseenter',function(event){
    $(this).children('.overlay-content').addClass('active').fadeIn();
  })

  $('.post').on('mouseleave',function(event){
    $(this).children('.overlay-content').removeClass('active').fadeOut();
  })

  $('a[data-target="#image-upload-modal"]').on('click',function(){
    let modalBody = $('.modal-body')
    if (!init){
    $.post("/uploads/new",function(response, status){
      let albumList = $('#album-list')
        if (response.success){
          if (!init){
            response.albums.forEach((album)=>{
              albumList.append(`<option value="${album.name}">${album.name}</option>`);
            });
            init=true;
          }
        }else{
          modalBody.append(`<div class="alert alert-danger">${response.msg}</div>`);
        }
      });
    }
  });

  $('#upload-form').on('submit',function(event){
     let imageUploadModal = $('#image-upload-modal');
      imageUploadModal.modal('hide');
  })

  $('#viewAlbums').on('mouseenter', function(event){
    //get data from database
    let viewAlbums = this;
    let myAlbums = $(viewAlbums).find('#myAlbums > div.row');
    console.log(myAlbums);
    if (!showAlbums){
    $.get("/albums/api/albums", function(response, status){
      let albums = response;
      albums.forEach((album)=>{
        var data = `<div style="display:none" class="col-3"><a href="/albums/${album.id}">
          ${album.name}</a></div>`
        $(data).appendTo(myAlbums);
      });
      showAlbums=true;
      $(myAlbums).find('.col-3').show(800);

    });
    }else{
      $(myAlbums).find('.col-3').show(800);
    }
  })

  $('#viewAlbums').on('mouseleave', function(event){
    let viewAlbums = this;
    let myAlbums = $(viewAlbums).find('#myAlbums div.col-3');
     myAlbums.hide(1000);
  });
});
