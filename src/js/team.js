var convert = {"web exploitation":"web","reverse engineering":"reverse",
"binary exploitation":"binary","forensics":"forensics","cryptographgy":"crypto",
"algorithm":"algo","asymptotic":"asymptotic", "miscellaneous":"misc"}
function generateGraph(uid, submissions, element){
  var totalcount = 0;
  var categories = {"web":0,"crypto":0,"reverse":0,"forensics":0,"binary":0,"algo":0,"asymptotic":0,"misc":0};
  for (var i = 0; i < submissions.length; i++){
    if (submissions[i]["uid"] == uid){
      totalcount+= 1;
      categories[convert[submissions[i]["category"].toLowerCase()]] += 1;
    }
  }
  if (totalcount > 0){
    for (var key in categories){
      var percent = (categories[key]/totalcount)*100 ;
      element.append("<div class=\"progress-bar " +  key  + " \" id=\"graphProgress\" role=\"progressbar\" style=\"width:" + percent + "%\"></div>")

    }
  }

}
$.ajax({
   url: '/api/user/status',
   success: function(result) {
     $(function() {
       if (result.status == 1 && result.data.logged_in == true){
         console.log(result.data['team_name'] != result.data['username']);
         if(result.data['team_name'] != result.data['username']){
           $('#textTeam').text(result.data['team_name']);
           $('#teamedUp').removeClass('hidden');
           $.ajax({
             url: '/api/team',
             success: function(teamresult) {

               if (teamresult.status == 1){
                 $('#inputUpdateAffiliation').attr("placeholder", teamresult.data.affiliation);
                 if (teamresult.data.eligible){
                   $('#teamEligible').text('eligible for prizes').addClass('green');
                   $('#teamEligible2').text('!');
                 }
                 else{
                   $('#teamEligible').text('not eligible for prizes').addClass('brightred');
                   $('#teamEligible2').text(' because one or more members are ineligible.')
                 }
                 for (var i = 0; i < 5; i++){
                   if (i < teamresult.data.size){
                     if(teamresult.data.members[i].username == result.data.username){
                       $('#user'+i + ' .left-info').text("YOU");
                       $('#user'+i + ' .left-info').addClass('purple-a200');
                     }
                     else{
                       $('#user'+i + ' .left-info').text(teamresult.data.members[i].username);
                       $('#user'+i + ' .left-info').addClass('gray-200');
                     }
                      $('#user'+i).removeClass('hidden');
                      generateGraph(teamresult.data.members[i]["uid"],teamresult.data.solved_problems, $('#user'+i + ' .right-info .progress'))
                      if(teamresult.data.members[i]["eligibility"] == "eligible"){
                        $('#user'+i + ' .right-info .h4').addClass('green').text('eligible')
                      }
                      else{
                        $('#user'+i + ' .right-info .h4').addClass('red').text('not eligible')
                      }
                   }
                 }
                 if(5-teamresult.data.size > 1){
                   var slots = 5-teamresult.data.size;
                   $('#textRemaining').text('[' + slots + ' empty spots remaining]' )
                 }
                 else if (5-teamresult.data.size == 1){
                   $('#textRemaining').text('[ 1 empty spot remaining]' )
                 }
                 else {
                   $('#textRemaining').text('No spots remaining' )
                 }
               }
             },
             type: 'GET'
           });
         }
       }
     });

   },
   type: 'GET'
});
$(function() {
  $('#teamTab').addClass("active");
  $('#headerProfile').addClass('active');
  $('.navbar').addClass('profile');
  $( "#actionJoin" ).click(function() {
     var team_name = $('#inputTeam').val();
     var team_password = $('#inputPass').val();
     $.ajax({
        url: '/api/team/join',
        data: {
           "team_name": team_name,
           "team_password": team_password
        },
        success: function(data) {
         if (data.status == 1){
           window.location.href = "/team";
         }
         else{
           $('#helpError h4').text(data.message);
         }
        },
        type: 'POST'
     });
   });
   $( "#actionCreate" ).click(function() {
     var team_name = $('#inputTeam').val()
     var team_password = $('#inputPass').val()
     var team_affiliation = $('#inputCreateAffiliation').val();
     $.ajax({
        url: '/api/team/create',
        data: {
           "team_name": team_name,
           "team_password": team_password,
           "team_affiliation": team_affiliation,
        },
        success: function(data) {
          if (data.status == 1){
            window.location.href = "/team";
          }
          else{
            $('#helpError h4').text(data.message);
          }
        },
        type: 'POST'
     });
   });
   $( "#actionAffiliation" ).click(function() {
     var team_affiliation = $('#inputUpdateAffiliation').val();
     $.ajax({
        url: '/api/team/change_affiliation',
        data: {
           "team_affiliation": team_affiliation
        },
        success: function(data) {
          if (data.status == 1){
            window.location.href = "/team";
          }
          else{
            $('#helpError2 h4').text(data.message);
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
