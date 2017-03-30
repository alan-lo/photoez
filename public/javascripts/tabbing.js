$(document).ready(function() {

  $('#sign-in-btn').on('click', function(){
    $(this).addClass('active');
    $('#login-btn').removeClass('active');
    $('#login').removeClass('active');
    $('#sign-up').addClass('active');
  })

  $('#login-btn').on('click', function(){
    $(this).addClass('active');
    $('#sign-in-btn').removeClass('active');
    $('#sign-up').removeClass('active');
    $('#login').addClass('active');
  })
})
