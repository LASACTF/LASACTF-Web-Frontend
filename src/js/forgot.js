$(function() {
  $("#reset-form").submit(function(event) {
    event.preventDefault();
    var username = $('#reset-form').find('input[id="inputUsername"]').val();
    $.ajax({
      url: '/api/user/reset_password',
      data: {
        "username": username
      },
      success: function(data) {
        if (data.status == 1) {
          $('#helpBlock').addClass("success-text");
          $('#inputGroup').removeClass('has-failure').addClass('has-success');
          $('#helpBlock').text(data.message);
        } else {
          $('#helpBlock').removeClass("success-text");
          $('#inputGroup').removeClass('has-success').addClass('has-failure');
          $('#helpBlock').text(data.message);
        }
      },
      type: 'POST'
    });
  });
});
