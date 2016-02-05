$(function() {
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
        if (data.status == 1){
          window.location.href = "profile.html";
        }
        else{
          $('#inputGroup').addClass('has-failure');
          $('#helpBlock').text(data.message);
        }
       },
       type: 'POST'
    });
  });
});
