var levels = [100,300,500,700];
$.ajax({
  url: '/api/team',
  success: function(teamresult) {
    $(function() {
      if(teamresult.status == 1){
        $('#textXP').text(teamresult.data.score);
        if (teamresult.data.score < levels[0]){
          $('#textLevel').text(0);
          $('#textNext').text(levels[0] - teamresult.data.score);
          $('#graphProgress').width( (teamresult.data.score)/(levels[0])*100 + "%");
        }
        else {
          for (var i = 0; i < levels.length; i++){
            if (i+1 == levels.length){
              $('#textLevel').text(i+1);
              $('#textNext').text('∞')
              $('#graphProgress').width('100%')
            }
            else if (teamresult.data.score < levels[i+1] && teamresult.data.score > levels[i] ){
              $('#textLevel').text(i+1 + "");
              $('#textNext').text(levels[i+1]-teamresult.data.score);
              $('#graphProgress').width( ((teamresult.data.score - levels[i])/(levels[i+1]-levels[i]))*100 + "%");
              break;
            }
          }
        }
      }
    });
  },
  type: 'GET'
});
$.ajax({
  url: '/api/stats/scoreboard',
  success: function(result) {
    $(function() {
      console.log(result);
    });
  },
  type: 'GET'
});
