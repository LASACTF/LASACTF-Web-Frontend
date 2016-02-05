$('input, textarea').placeholder();

function cleanStatus() {

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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

function genericEmptyCheck(field, help) {
	if(field.val().length == 0) {
		field.parent().parent().addClass('has-failure');
		field.parent().parent().removeClass('has-success');
		help.text('This field is required');
	}
	else if(field.val().length > 32) {
		field.parent().parent().addClass('has-failure');
		field.parent().parent().removeClass('has-success');
		help.text('No more than 32 characters are allowed');
	}
	else {
		valid = true;
		if(arguments.length > 2) {
			var i;
			for(i = 2; i < arguments.length; i++)
			{
				if (!arguments[i].hasClass('hidden') && arguments[i].val().length == 0) {
					valid = false;
					break;
				}
			}
		}
		if(valid) {
			field.parent().parent().removeClass('has-failure');
			field.parent().parent().addClass('has-success');
		}
		help.text('');
	}
}

function locationCheck() {
	if($('#inputState').val().length > 32 || $('#inputCity').val().length > 32 || (!$('#inputInternational').hasClass('hidden') && $('#inputInternational').val().length > 32)) {
		$('#inputState').parent().parent().addClass('has-failure');
			$('#inputState').parent().parent().removeClass('has-success');
			$('#helpLocation').text('These fields may only have up to 32 characters in them');
			return;
	}
	if($('#inputInternational').hasClass('hidden')) {
		if($('#inputState').val().length != 0 && $('#inputCity').val().length != 0) {
			$('#inputState').parent().parent().removeClass('has-failure');
			$('#inputState').parent().parent().addClass('has-success');
			$('#helpLocation').text('');
		}
		else {
			$('#inputState').parent().parent().addClass('has-failure');
			$('#inputState').parent().parent().removeClass('has-success');
			$('#helpLocation').text('Please enter a city and state');
		}
	}
	else {
		if($('#inputInternational').val().length != 0) {
			$('#inputState').parent().parent().removeClass('has-failure');
			$('#inputState').parent().parent().addClass('has-success');
			$('#helpLocation').text('');
		}
		else
		{
			$('#inputState').parent().parent().addClass('has-failure');
			$('#inputState').parent().parent().removeClass('has-success');
			$('#helpLocation').text('Please enter a country');
		}
	}
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
		$('#helpUsername').text('Usernames cannot be more than 32 characters');
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

  $('#inputFirstName').on('blur',function(e){
	 genericEmptyCheck($('#inputFirstName'), $('#helpFirstName'), $('#inputLastName'));
  });

  $('#inputLastName').on('blur',function(e){
	 genericEmptyCheck($('#inputLastName'), $('#helpLastName'), $('#inputFirstName'));
  });

  $('#inputAffiliation').on('blur',function(e){
	 genericEmptyCheck($('#inputAffiliation'), $('#helpAffiliation'));
  });

  $('#inputStatus').on('blur', function(e) {
	$('#inputStatus').parent().parent().addClass('has-success');
});

  $('#inputEmail').on('blur', function(e) {
  	if($('#inputEmail').val().length > 100) {
  		$('#inputEmail').parent().parent().addClass('has-failure');
  		$('#inputEmail').parent().parent().removeClass('has-success');
  		$('#helpEmail').text('Invalid email address');
  	}
  	else if(validateEmail($('#inputEmail').val())){
  		$('#inputEmail').parent().parent().addClass('has-success');
  		$('#inputEmail').parent().parent().removeClass('has-failure');
  		$('#helpEmail').text('');
  	}
  	else {
  		$('#inputEmail').parent().parent().addClass('has-failure');
  		$('#inputEmail').parent().parent().removeClass('has-success');
  		$('#helpEmail').text('Invalid email address');
  	}
  });

  $('#inputCountry').on('change', function(e) {
  	if($('#inputCountry').val() == 'us') {
  		$('#inputInternational').addClass('hidden');
  		locationCheck();
  	}
  	else {
  		$('#inputInternational').removeClass('hidden');
  		locationCheck();
  	}
  });
  $('#inputCity').on('blur', function(e) {
  		locationCheck();
  });
  $('#inputState').on('blur', function(e) {
  		locationCheck();
  });
  $('#inputInternational').on('blur', function(e) {
  		locationCheck();
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
    var international = $('#registration-form').find('input[id="international"]').val();

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
	$('.required').each(function() {
		if($(this).hasClass('hidden')) return;
		if(!$(this).parent().parent().hasClass('has-success')) {
			formFailed = true;
			console.log($(this));
			if($(this).val().length == 0) {
				$(this).parent().parent().addClass('has-failure');
				$(this).parent().parent().removeClass('has-success');
			}
		}
	});

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
            "extra":JSON.stringify({"city":city,"state":state,"country":country, "international":international, "ctf":ctf,"experience":experience,"selection":selection,"status":status}),
						"g-recaptcha-response": grecaptcha.getResponse()
				 },
         success: function(data) {
					if (data.success == 1){
					 	window.location.href = "/login.html";
					}
					else{
            $('#helpError').text("Error:" + data.message);
						grecaptcha.reset()
					}
				 },
         type: 'POST'
      });
    }
  });
});
