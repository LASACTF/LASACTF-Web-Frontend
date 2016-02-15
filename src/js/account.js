$.ajax({
   url: '/api/user/status',
   success: function(result) {
     $(function() {
       if (result.status == 1 && result.data.logged_in == true){
         var extra = JSON.parse(result.data['extra']);
         $('#textUsername').text(result.data['username']);
         $('#textName').text(result.data['firstname'] + " " + result.data['lastname']);
         $('#textEmail').text(result.data['email']);
         $('#textAffliation').text(result.data['affiliation']);
         switch (extra.schooltype) {
           case "high":
             $('#textAffliationType').text("High School or Equivalent");
             break;
           case "college":
             $('#textAffliationType').text("Higher Education (college, university, etc.)");
             break;
           case "corp":
             $('#textAffliationType').text("Corporation / Non-Profit");
             break;
          case "middle":
             $('#textAffliationType').text("Middle School or Equivalent");
             break;
          case "other":
             $('#textAffliationType').text("Other");
             break;
           default:
             $('#textAffliationType').text("High School or Equivalent");
             break;
         }
         if(extra['state'].length > 0){
           $('#textLocation1').text(extra['city'] + ", " + extra['state']);
         }
         else{
           $('#textLocation1').text(extra['city']);
         }
         if (extra['country'] == 'us'){
           $('#textLocation2').text("United States");
         }
         else{
           $('#textLocation2').text(extra['international']);
         }
         if(result.data['eligibility'] == "eligible"){
           $('#textEligibile').text('Eligible for prizes').addClass("success-text")
         }
         else{
           $('#textEligibile').text('Not eligible for prizes').addClass("failure-text")
         }
       }
     });
   },
   type: 'GET'
});
$(function() {
  $('#profileTab').addClass("active");
  $('#inputCountdown').click(function(){
    localStorage.setItem("nocountdown",$('#inputCountdown').is(':checked'));
    if ($('#inputCountdown').is(':checked')){
      $('#countdown').addClass("hidden");
    }
    else{
      $('#countdown').removeClass("hidden");
    }
  });
  if (localStorage.getItem("nocountdown") == "true"){
    $('#inputCountdown').prop('checked', true);
  }
});
