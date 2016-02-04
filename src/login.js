$(function() {
  $('#inputUsername').on('input',function(e){
    if ($('#inputUsername').val().length > 0 && $('#inputPassword').val().length > 0){
      $('#inputSubmit').removeClass("disabled");
    }
    else {
      $('#inputSubmit').addClass("disabled");
    }
  });
  $('#inputPassword').on('input',function(e){
    if ($('#inputUsername').val().length > 0 && $('#inputPassword').val().length > 0){
      $('#inputSubmit').removeClass("disabled");
    }
    else {
      $('#inputSubmit').addClass("disabled");
    }
  });
  $( "#login-form" ).submit(function( event ) {
    event.preventDefault();
    var username = $('#login-form').find('input[id="inputUsername"]').val();
    var password = $('#login-form').find('input[id="inputPassword"]').val();

    $.ajax({
       url: 'https://lasactf.com/api/user/login',
       data: {
          "username": username,
          "password": password,
       },
       success: function(data) {
        console.log(data);
       },
       type: 'POST'
    });
  });
});
