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

});
