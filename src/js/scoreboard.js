function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}
$.ajax({
   url: '/api/stats/scoreboard',
   success: function(result) {
       if (result.status == 1){
         $.ajax({
            url: '/api/team',
            success: function(teamresult) {
                if (result.status == 1){
                  var table = $('#scoreTable');
                  $('#textScore').text(teamresult.data.score);
                  for (var i = 0; i < result.data.public.length; i++){
                    var team = result.data.public[i];
                    if (teamresult.data.team_name != team.name){
                      var append =
                      '<div class="scorerow white">
                        <div class="col"><h2 class="text">' + (i+1 )+'<text class="ligature">'+ ordinal_suffix_of(i+1) + '</text></h2></div>
                        <div class="col"><h2 class="text">' + team.name + '</h2></div>
                        <div class="col"><h4 class="text">' + team.affiliation + '</h4></div>
                        <div class="col"><h2 class="text">' + team.score + '<text class="h5 color-grey-600"> XP</text></h2></div>
                      </div>';
                      table.append(append);
                    }
                    else{
                      $('#textPlace').html((i+1)+ '<text class="ligature" id="textSuffix">' + ordinal_suffix_of(i+1) + '</text> place');
                      var append =
                      '<div class="scorerow white you">
                        <div class="col"><h2 class="text">' + (i+1 )+'<text class="ligature">'+ ordinal_suffix_of(i+1) + '</text></h2></div>
                        <div class="col"><h2 class="text">' + team.name + '</h2></div>
                        <div class="col"><h4 class="text">' + team.affiliation + '</h4></div>
                        <div class="col"><h2 class="text">' + team.score + '<text class="h5 color-grey-600"> XP</text></h2></div>
                      </div>';
                      table.append(append);
                    }
                  }
                  if($('#textPlace').text().includes("-1")){
                    $('#textPlace').text("∞ place");
                    $('#divScored').addClass("hidden");
                    $('#divUnscored').removeClass("hidden");
                  }
                }
            },
            type: 'GET'
         });
       }
   },
   type: 'GET'
});
$(function() {
  $('#headerScoreboard').addClass('active');
  $('.navbar').addClass('scoreboard');
});
