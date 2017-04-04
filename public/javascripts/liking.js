$(document).ready(function() {
  $(document).on( 'click','.fa-heart-o', function(event){
    let link = $(this).parents('.overlay-content').siblings('a').attr('href');
    let postId = $(this).parent().next().find('.postId').html();
    $.post(`/likes/${postId}`, {link: link, postId: postId} ,function(response, status){
      if (response.success){
        $(event.target).siblings('.likes-count').html(`${response.likes}`);
      }
      $(event.target).removeClass('fa-heart-o');
      $(event.target).addClass('fa-heart');
    })
  })

  $(document).on( 'click','.fa-heart', function(event){
    let link = $(this).parents('.overlay-content').siblings('a').attr('href');
    let postId = $(this).parent().next().find('.postId').html();
    $.ajax({
      url: `/likes/${postId}`,
      type: 'delete',
      contentType: "application/x-www-form-urlencoded",
      data: {link: link, postId: postId},
      success: function (response, status) {
        if (response.success){
          $(event.target).siblings('.likes-count').html(`${response.likes}`);
        }
        $(event.target).removeClass('fa-heart');
        $(event.target).addClass('fa-heart-o');
      },
      error: function (xhr, desc, err) {
        console.log("Desc: " + desc + "\nErr:" + err);
      }
    });
  });
})
