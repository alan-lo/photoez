function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function passValidation(node){
  if (!$(node).parent().hasClass('has-success')) {
    $(node).parent().addClass('has-success')
    $(node).addClass('form-control-success')
  }
  if($(node).parent().hasClass('has-danger')){
    $(node).parent().removeClass('has-danger');
    $(node).removeClass('form-control-danger');
  }
}

function failValidation(node){
  if ($(node).parent().hasClass('has-success')) {
    $(node).parent().removeClass('has-success');
    $(node).removeClass('form-control-success');
  }
  $(node).parent().addClass('has-danger')
  $(node).addClass('form-control-danger')
}

$(document).ready(function() {
  $('#username, #password, #email, #firstname, #lastname').on('keyup', function() {
    if ($(this).val()) {
      if (this.id=='email'){
        if (validateEmail($(this).val())){
          passValidation(this);
        }else{
          failValidation(this);
        }
      }else{
          passValidation(this);
      }
    } else{
      failValidation(this);
    }
  })
});
