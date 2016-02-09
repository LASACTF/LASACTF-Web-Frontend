$(function() {
  $( "#reset-form" ).submit(function( event ) {
    event.preventDefault();
    var password = $('#reset-form').find('input[id="inputPassword"]').val();
    var passwordconfirmation = $('#reset-form').find('input[id="inputPasswordConfirm"]').val();

    $.ajax({
       url: 'http://design.lasactf.com/api/user/confirm_password_reset',
       data: {
          "new-password": password,
          "new-password-confirmation": passwordconfirmation,
          "reset-token":window.location.hash.substring(1)
       },
       success: function(data) {
        if (data.status == 1){
          $('#helpBlock').addClass("success-text");
          $('#helpBlock').text(data.message);
          setTimeout(
          function()
          {
            window.location.href = "/login";
          }, 2000);
        }
        else{
          $('#helpBlock').removeClass("success-text");
          $('#inputGroup').addClass('has-failure');
          $('#helpBlock').text(data.message);
        }
       },
       type: 'POST'
    });
  });
});
