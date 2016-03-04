var levels = [100, 300, 500, 700];

function regenScoreboard(score) {
  $('#textXP').text(score);
  if (score < levels[0]) {
    $('#textLevel').text(0);
    $('#textNext').text(levels[0] - score);
    $('#graphProgress').width((score) / (levels[0]) * 100 + "%");
  } else {
    for (var i = 0; i < levels.length; i++) {
      if (i + 1 == levels.length) {
        $('#textLevel').text(i + 1);
        $('#textNext').text('∞');
        $('#graphProgress').width('100%');
      } else if (score < levels[i + 1] && score > levels[i]) {
        $('#textLevel').text(i + 1 + "");
        $('#textNext').text(levels[i + 1] - score);
        $('#graphProgress').width(((score - levels[i]) / (levels[i + 1] - levels[i])) * 100 + "%");
        break;
      }
    }
  }
}
$.ajax({
  url: '/api/team',
  success: function(teamresult) {
    $(function() {
      if (teamresult.status == 1) {
        regenScoreboard(team.data.score);
        $('#scorebar').removeClass('hidden');
      }
    });
  },
  type: 'GET'
});
$.ajax({
  url: '/api/stats/scoreboard',
  success: function(result) {
    $(function() {
      var inscoreboard = false
      for (var i = 0; i < result.data.public.length; i++) {
        if (teamresult.data.team_name == team.name) {
          inscoreboard = true;
          $('#textRank').text((i + 1) + "");
        }
      }
    });
  },
  type: 'GET'
});
