$(function() {
  $.ajax({
     url: 'http://design.lasactf.com/api/user/status',
     success: function(result) {
       console.log(result);
       var extra = JSON.parse(result.data['extra']);
       console.log(extra);
       if (result.status == 1){
         $('#textUsername').text(result.data['username']);
         $('#textName').text(result.data['firstname'] + " " + result.data['lastname']);
         $('#textEmail').text(result.data['email']);
         $('#textAffliation').text(extra['affiliation']);
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
         if(extra['eligibility'] == "eligible"){
           $('#textEligibile').text('Eligible for prizes').addClass("success-text")
         }
         else{
           $('#textEligibile').text('Not eligible for prizes').addClass("failure-text")
         }
         if(result.data['team_name'] != result.data['username']){
           $('inputTeam').text(result.data['team_name']);
         }

       }
     },
     type: 'GET'
  });
  $( "#actionJoin" ).click(function() {
    var team_name = $('#inputTeam').val()
    var team_password = $('#inputTeamPass').val()
    $.ajax({
       url: '/api/team/join',
       data: {
          "team_name": team_name,
          "team_password": team_password,
       },
       success: function(data) {
        if (data.status == 1){
          window.location.href = "/profile";
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
