$('input, textarea').placeholder();

//Registration page submission
$(function() {
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
    if (country == "us" && schooltype == "high" && status == "comp"){
      eligibility = "eligible";
    }
    if (password == confirmpassword){
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
