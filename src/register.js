$('input, textarea').placeholder();

function cleanStatus() {
	
}

function validatePassword() {
    if($('#inputPassword').val().length < 6) {
        $('#inputPassword').parent().parent().addClass('has-failure');
        $('#inputPassword').parent().parent().removeClass('has-success');
        $('#helpPassword').text('Passwords must be at least 6 characters');
        return;
	}
	if($('#inputPassword').val().length > 50) {
		$('#inputPassword').parent().parent().addClass('has-failure');
		$('#inputPassword').parent().parent().removeClass('has-success');
		$('#helpPassword').text('Passwords cannot be more than 50 characters');
		return;
	}
	if($('#inputPassword').val() != $('#inputConfirmPassword').val()) {
		$('#inputPassword').parent().parent().addClass('has-failure');
		$('#inputPassword').parent().parent().removeClass('has-success');
		$('#helpPassword').text('Passwords must match');
		return;
	}
	$('#inputPassword').parent().parent().removeClass('has-failure');
	$('#inputPassword').parent().parent().addClass('has-success');
	$('#helpPassword').text('');
}
//Registration page submission
$(function() {
	$('#inputUsername').on('blur',function(e){
	if($('#inputUsername').val().length < 3) {
		$('#inputUsername').parent().parent().addClass('has-failure');
		$('#inputUsername').parent().parent().removeClass('has-success');
		$('#helpUsername').text('Usernames must be at least 3 characters');
		return;
	}
	if($('#inputUsername').val().length > 20) {
		$('#inputUsername').parent().parent().addClass('has-failure');
		$('#inputUsername').parent().parent().removeClass('has-success');
		$('#helpUsername').text('Usernames cannot be more than 20 characters');
		return;
	}
    if(/\s/g.exec($('#inputUsername').val()) != null)
    {
        $('#inputUsername').parent().parent().addClass('has-failure');
		$('#inputUsername').parent().parent().removeClass('has-success');
		$('#helpUsername').text('Usernames may not contain whitespace');
		return;
    }
    $.ajax({
       url: 'https://lasactf.com/api/user/check_username',
       data: {
          "username": $('#inputUsername').val(),       },
       success: function(data) {
        if(data['status']==1) {
			$('#inputUsername').parent().parent().addClass('has-success');
			$('#inputUsername').parent().parent().removeClass('has-failure');
			$('#helpUsername').text('');
		}
		else {
			$('#inputUsername').parent().parent().addClass('has-failure');
			$('#inputUsername').parent().parent().removeClass('has-success');
			$('#helpUsername').text('That username is already taken!');
		}
       },
       type: 'POST'
    });
  });
  
  $('#inputPassword').on('blur',function(e){
	  validatePassword();
  });
  
    $('#inputConfirmPassword').on('blur',function(e){
		validatePassword();
  });
  
  $( "#registration-form" ).submit(function( event ) {
    event.preventDefault();
    var username = $('#registration-form').find('input[id="inputUsername"]').val();
    var password = $('#registration-form').find('input[id="inputPassword"]').val();
    var confirmpassword = $('#registration-form').find('input[id="inputConfirmPassword"]').val();
    var firstname = $('#registration-form').find('input[id="inputFirstName"]').val();
    var email = $('#registration-form').find('input[id="inputEmail"]').val();
    var affiliation = $('#registration-form').find('input[id="inputAffiliation"]').val();

    var status = $('#registration-form').find('select[id="inputStatus"]').val();
    var schooltype = $('#registration-form').find('select[id="inputSchoolType"]').val();

    var city = $('#registration-form').find('input[id="inputCity"]').val();
    var state = $('#registration-form').find('input[id="inputState"]').val();
    var country = $('#registration-form').find('select[id="inputCountry"]').val();

    var ctf = $('#registration-form').find('select[id="inputCTFs"]').val();
    var experience = $('#registration-form').find('select[id="inputExperience"]').val();
    var selection = $('#registration-form').find('select[id="inputSection"]').val();

    var eligibility = "ineligible";
    console.log(country,schooltype,status);
	cleanStatus();
    if (country == "us" && schooltype == "high" && status == "comp"){
      eligibility = "eligible";
    }
	var formFailed = false;
    /** TODO TEST FOR FORM FAILURE **/
    if (!formFailed){
      $.ajax({
         url: 'https://lasactf.com/api/user/create_simple',
         data: {
            "username": username,
            "password": password,
            "groupName": "",
            "email": email,
            "firstname": firstname,
            "lastname": "test",
            "eligibility": eligibility,
            "affiliation":affiliation,
            "extra":JSON.stringify({"city":city,"state":state,"country":country, "ctf":ctf,"experience":experience,"selection":selection,"status":status})
         },
         success: function(data) {
          window.location.href = "login.html"
         },
         type: 'POST'
      });
    }
  });
});
