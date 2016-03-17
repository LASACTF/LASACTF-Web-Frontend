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

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
$.ajax({
  url: '/api/stats/scoreboard',
  success: function(result) {
    if (result.status == 1) {
      $.ajax({
        url: '/api/team',
        success: function(teamresult) {
          if (result.status == 1) {
            var table = $('#scoreTable');
            $('#textScore').text(teamresult.data.score);
            var inscoreboard = false;
            var scoreboard = result.data.public;
            if (window.location.href.includes("unranked")){
              scoreboard = result.data.ineligible;
            }
            for (var i = 0; i < scoreboard.length; i++) {
              var team = scoreboard[i];
              var value = {
                "name": team.name,
                "affiliation": team.affiliation,
                "score": team.score,
                "num": i + 1 + "",
                "suffix": ordinal_suffix_of(i + 1),
                "you": teamresult.data.team_name == team.name
              };
              if (teamresult.data.team_name == team.name){
                inscoreboard = true;
                $('#textPlace').text((i + 1) + "");
                $('#textSuffix').text(ordinal_suffix_of(i + 1));

              }
              table.append(App.templates.scoreboard(value));
            }
            if (inscoreboard) {
              $('#divScored').removeClass("hidden");
              $('#divXp').removeClass("hidden");
            }
            else if (teamresult.status == 1){
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
  if (window.location.href.includes("unranked")){
    $('#unrankedTab').addClass('active');
  }
  else{
    $('#rankedTab').addClass('active');
  }
  $('#headerScoreboard').addClass('active');
  $('.navbar').addClass('scoreboard');
  $('.navbar').addClass('profile');
});
