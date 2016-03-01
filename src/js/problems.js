var convert = {
  "web exploitation": "web",
  "reverse engineering": "reverse",
  "binary exploitation": "binary",
  "forensics": "forensics",
  "cryptography": "crypto",
  "algorithm": "algo",
  "asymptotic": "asymptotic",
  "miscellaneous": "misc"
};
var icon = {
  "web": "&#xE894;",
  "reverse": "&#xE042;",
  "binary": "&#xE90E;",
  "forensics": "&#xE90D;",
  "crypto": "&#xE897;",
  "algo": "&#xE155;",
  "asymptotic": "",
  "misc": ""
};

function ajaxSubmit(input, help, parent) {
  $.ajax({
    url: '/api/problems/submit',
    data: {
      "key": input.val(),
      "pid": input.attr('data-pid'),
      "token": $.cookie('token'),
    },
    success: function(result) {
      if (result.status == 1) {
        help.removeClass("failure-text").addClass("success-text");
        parent.removeClass('has-failure').addClass('has-success');
        help.children('h3').text(result.message);
        setTimeout(
          function() {
            window.location.href = "/problems";
          }, 2000);
      } else {
        help.addClass("failure-text");
        parent.removeClass('has-success').addClass('has-failure');
        help.children('h3').text(result.message);
      }
    },
    type: 'POST'
  });
}
$.ajax({
  url: '/api/problems',
  success: function(result) {
    $(function() {
      if (result.status == 1) {
        var collapse = false;
        if (localStorage.getItem("collapse") == "true") {
          collapse = true;
        }
        for (var i = 0; i < result.data.length; i++) {
          var problem = result.data[i];
          var hint = "";
          for (var j = 0; j < problem.hints.length; j++){
            hint += problem.hints[j] + '<br>';
          }
          var value = {
            "pid": problem.pid,
            "description": problem.description,
            category: convert[problem.category.toLowerCase()],
            "name": problem.name,
            "score": problem.score,
            "icon": icon[convert[problem.category.toLowerCase()]],
            "hint": hint,
            "solved": problem.solved ? true : null,
            "collapse": collapse
          };
          $('#main').append(App.templates.problem(value));
        }
        $('.select').click(function() {
          var selection = $(this).attr('data-tab');
          $(this).siblings('div').removeClass('active');
          $(this).addClass('active');
          var bodies = $(this).parent().siblings('.body');
          for (var i = 0; i < bodies.length; i++) {
            var local = bodies.eq(i);
            if (local.hasClass(selection + '-tab')) {
              if (local.hasClass('hidden')) {
                local.removeClass('hidden');
              }
            } else if (!local.hasClass('hidden')) {
              local.addClass('hidden');
            }
          }
        });
        $('.input-group-btn').click(function() {
          var input = $(this).siblings('input').eq(0);
          var parent = $(this).parent();
          var help = parent.siblings('.help-block').eq(0);
          ajaxSubmit(input, help, parent);
        });
        $('.problem-submit .form-control').keypress(function(event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);
          if (keycode == '13') {
            var input = $(this);
            var parent = $(this).parent();
            var help = parent.siblings('.help-block').eq(0);
            ajaxSubmit(input, help, parent);
          }
        });
        $('.problem-submit .form-control').on('input',function(event) {
          var button = $(this).siblings().eq(0).children().eq(0);
          if ($(this).val().length > 0){
            button.addClass('active');
          }
          else{
            button.removeClass('active');
          }
        });

        $('.sliderTime').slider();
        $(".sliderTime").on("slide", function(slideEvt) {
          var value = slideEvt.value;
          var mins = value % 60;
          var hours = Math.floor(value / 60);
          var m = mins.toString().length == 2 ? mins.toString() : "0" + mins.toString();
          $(".sliderTimeDisplay").text(hours.toString() + ":" + m);
        });
        $('.sliderDifficulty').slider();
        $(".sliderDifficulty").on("slide", function(slideEvt) {
          var value = slideEvt.value;
          switch (value) {
            case 1:
              $(".sliderDifficultyDisplay").text("Very Easy");
              break;
            case 2:
              $(".sliderDifficultyDisplay").text("Easy");
              break;
            case 3:
              $(".sliderDifficultyDisplay").text("Average");
              break;
            case 4:
              $(".sliderDifficultyDisplay").text("Hard");
              break;
            case 5:
              $(".sliderDifficultyDisplay").text("Very Hard");
              break;
            default:
              $(".sliderDifficultyDisplay").text("Unknown");
              break;
          }
        });
        $('.sliderInterest').slider();
        $(".sliderInterest").on("slide", function(slideEvt) {
          var value = slideEvt.value;
          switch (value) {
            case 1:
              $(".sliderInterestDisplay").text("Very Low");
              break;
            case 2:
              $(".sliderInterestDisplay").text("Low");
              break;
            case 3:
              $(".sliderInterestDisplay").text("Average");
              break;
            case 4:
              $(".sliderInterestDisplay").text("High");
              break;
            case 5:
              $(".sliderInterestDisplay").text("Very High");
              break;
            default:
              $(".sliderInterestDisplay").text("Unknown");
              break;
          }
        });
      }
    });
  },
  type: 'GET'
});
$(function() {
  $('#headerProblems').addClass('active');
  $('.navbar').addClass('problems');
});
