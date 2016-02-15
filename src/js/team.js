$.ajax({
   url: '/api/user/status',
   success: function(result) {
     if (result.status == 1 && result.data.logged_in == true){
       if(result.data['team_name'] != result.data['username']){
         $('#textTeam').text(result.data['team_name']);
         $('#noTeam').addClass('hidden');
         $('#teamedUp').removeClass('hidden');
         $.ajax({
           url: '/api/team',
           success: function(teamresult) {

             if (teamresult.status == 1){
               if (teamresult.data.eligible){
                 $('#teamEligible').text('eligible for prizes').addClass('green');
                 $('#teamEligible2').text('!');
               }
               else{
                 $('#teamEligible').text('not eligible for prizes').addClass('red');
                 $('#teamEligible2').text(' because one or more members are ineligible.')
               }
               for (var i = 0; i < 5; i++){
                 if (i < teamresult.data.size){
                   if(teamresult.data.members[i].username == result.data.username){
                     $('#user'+i).text("YOU");
                     $('#user'+i).addClass('purple-a200');
                   }
                   else{
                      $('#user'+i).text(teamresult.data.members[i].username);
                      $('#user'+i).addClass('gray-200');
                   }
                 }
                 else{
                  $('#user'+i).text('[Empty Spot]')
                  $('#user'+i).addClass('gray-400')
                }
               }
             }
           },
           type: 'GET'
         });
       }
     }
   },
   type: 'GET'
});
$(function() {
  $('#teamTab').addClass("active");
  $( "#actionJoin" ).click(function() {
     var team_name = $('#inputTeam').val()
     var team_password = $('#inputPass').val()
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
   $( "#actionCreate" ).click(function() {
     var team_name = $('#inputTeam').val()
     var team_password = $('#inputPass').val()
     $.ajax({
        url: '/api/team/create',
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
   $('#showHidePass').click(function(){
     $.ajax({
       url: '/api/team',
       success: function(teamresult) {
         $('#hiddenPass').text("Team Passcode: " + teamresult.data.password);
       },
       type: 'GET'
     });
   });
   $('#actionLogout').click(function(){
     $.ajax({
       url: '/api/user/logout',
       success: function(result) {
         console.log("hi");
         window.location.href = "/login";
       },
       type: 'GET'
     });
   });
});
