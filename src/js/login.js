function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
$(function() {
  if (getURLParameter('v') == 1){
    $('#helpBlock').addClass("success-text");
    $('#helpBlock').text("Account Created! Check your email for verification instructions.");
  }
  else if (getURLParameter('s') == 1){
    $('#inputGroup').addClass('has-failure');
    $('#helpBlock').text("You must sign in to access that page.")
  }
  $( "#login-form" ).submit(function( event ) {
    event.preventDefault();
    var username = $('#login-form').find('input[id="inputUsername"]').val();
    var password = $('#login-form').find('input[id="inputPassword"]').val();

    $.ajax({
       url: '/api/user/login',
       data: {
          "username": username,
          "password": password,
       },
       success: function(data) {
        if (data.status == 1){
          window.location.href = "/problems";
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
