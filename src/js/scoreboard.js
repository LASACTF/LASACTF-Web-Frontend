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
  url: 'http://design.lasactf.com/api/stats/scoreboard',
  success: function(result) {
    if (result.status == 1) {
      $.ajax({
        url: 'http://design.lasactf.com/api/team',
        success: function(teamresult) {
          if (result.status == 1) {
            var table = $('#scoreTable');
            $('#textScore').text(teamresult.data.score);
            for (var i = 0; i < result.data.public.length; i++) {
              var team = result.data.public[i];
              var value = {
                "name": team.name,
                "affiliation": team.affiliation,
                "score": team.score,
                "num": i + 1 + "",
                "suffix": ordinal_suffix_of(i + 1),
                "you": teamresult.data.team_name == team.name
              };
              table.append(App.templates.scoreboard(value));
            }
            if ($('#textPlace').text().includes("-1")) {
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
