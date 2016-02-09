$(function() {
  $( "#reset-form" ).submit(function( event ) {
    event.preventDefault();
    var username = $('#reset-form').find('input[id="inputUsername"]').val();
    $.ajax({
       url: 'http://design.lasactf.com/api/user/reset_password',
       data: {
          "username": username
       },
       success: function(data) {
        if (data.status == 1){
          $('#helpBlock').addClass("success-text");
          $('#helpBlock').text(data.message);
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
