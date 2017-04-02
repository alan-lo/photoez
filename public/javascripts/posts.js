
let init = false;

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
          if (response.init){
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
});
