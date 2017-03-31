$(document).ready(function() {

  $('#sign-in-btn').on('click', function(event){
    $(this).addClass('active');
    $('#login-btn').removeClass('active');
    $('#login').removeClass('active');
    $('#sign-up').addClass('active');
  })

  $('#login-btn').on('click', function(event){
    $(this).addClass('active');
    $('#sign-in-btn').removeClass('active');
    $('#sign-up').removeClass('active');
    $('#login').addClass('active');
  })

  $('a[href="#login"]').on('click', function(event){
    event.preventDefault();
    $('#login-btn').addClass('active');
    $('#sign-in-btn').removeClass('active');
    $('#sign-up').removeClass('active');
    $('#login').addClass('active');
  })
})
