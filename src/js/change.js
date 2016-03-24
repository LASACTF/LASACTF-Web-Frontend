$(function() {
  $("#reset-form").submit(function(event) {
    event.preventDefault();
    var currentpassword = $('#reset-form').find('input[id="current-password"]').val();
    var newpassword = $('#reset-form').find('input[id="new-password"]').val();
    var newpasswordconfirmation = $('#reset-form').find('input[id="new-password-confirmation"]').val();

    $.ajax({
      url: '/api/user/update_password',
      data: {
        "current-password": currentpassword,
        "new-password": newpassword,
        "new-password-confirmation": newpasswordconfirmation
      },
      success: function(data) {
        if (data.status == 1) {
          $('#helpBlock').addClass("success-text");
          $('#inputGroup').removeClass('has-failure').addClass('has-success');
          $('#helpBlock').text(data.message);
          setTimeout(
            function() {
              window.location.href = "/login";
            }, 2000);
        } else {
          $('#helpBlock').removeClass("success-text");
          $('#inputGroup').removeClass('has-success').addClass('has-failure');
          $('#helpBlock').text(data.message);
        }
      },
      type: 'POST'
    });
  });

  $("#reset-team-form").submit(function(event) {
    event.preventDefault();
    var password = $('#reset-team-form').find('input[id="inputPassword"]').val();

    $.ajax({
      url: '/api/team/update_team_password',
      data: {
        "new-password": password
      },
      success: function(data) {
        if (data.status == 1) {
          $('#helpBlock1').addClass("success-text");
          $('#inputGroup1').removeClass('has-failure').addClass('has-success');
          $('#helpBlock1').text(data.message);
        } else {
          $('#helpBlock1').removeClass("success-text");
          $('#inputGroup1').removeClass('has-success').addClass('has-failure');
          $('#helpBlock1').text(data.message);
        }
      },
      type: 'POST'
    });
  });
});
