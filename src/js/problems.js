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
  "web":"&#xE894;",
  "reverse":"&#xE042;",
  "binary":"&#xE90E;",
  "forensics":"&#xE90D;",
  "crypto":"&#xE897;",
  "algo":"",
  "asymptotic":"",
  "misc":""
};
$.ajax({
  url: '/api/problems',
  success: function(result) {
    $(function() {
      if (result.status == 1){
        for (var i = 0; i < result.data.length; i++){
          var problem = result.data[i];
          if (!problem.solved){
            var str = '<div class="problem{{category}}" data-toggle="collapse" data-target="#{{pid}}" aria-expanded="true"> <div class="icon"> <i class="material-icons">{{icon}}</i> </div><text class="name">{{name}}</text> <text class="value">{{score}}XP</text> </div><div class="problem-slide{{category}}collapse in" id="{{pid}}"> <div class="selectbox"> <div class="select active" data-tab="problem"> <button><i class="material-icons">&#xE153;</i></button> </div><div class="select" data-tab="hint"> <button><i class="material-icons">&#xE887;</i></button> </div><div class="select" data-tab="feedback"> <button><i class="material-icons">&#xE8DD;</i></button> </div></div><div class="body problem-tab"> <h3 class="text">{{description}}</h3> <div class="input-group input-group-sm problem-submit"> <span class="input-group-btn"> <button class="btn purple sm" type="submit"><i class="material-icons">&#xE153;</i> SUBMIT</button> </span> <input type="text" placeholder="Submit Flag" class="form-control" data-pid="{{pid}}"> </div><span class="help-block"><h3></h3></span> </div><div class="body hidden hint-tab"> <h3 class="text">{{hint}}</h3> </div><div class="body hidden feedback-tab"> <div class="form-group" id="inputGroup"> <div class="row"> <div class="col-sm-6"> <h3 class="text">How much time did you spend?</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <input class="sliderTime" data-slider-id="ex1Slider" type="text" data-slider-min="0" data-slider-max="240" data-slider-step="15" data-slider-value="0"/> <text class="h3 sliderTimeDisplay">0:00</text> </div></div><br><div class="row"> <div class="col-sm-6"> <h3 class="text">How easy or challenging was the problem?</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <input class="sliderDifficulty" data-slider-id="ex1Slider" type="text" data-slider-min="1" data-slider-max="5" data-slider-step="1" data-slider-value="3"/> <text class="h3 sliderDifficultyDisplay">Average</text> </div></div><br><div class="row"> <div class="col-sm-6"> <h3 class="text">Rate your overall interest in the problem.</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <input class="sliderInterest" data-slider-id="ex1Slider" type="text" data-slider-min="1" data-slider-max="5" data-slider-step="1" data-slider-value="3"/> <text class="h3 sliderInterestDisplay">Average</text> </div></div><br><div class="row"> <div class="col-sm-6"> <h3 class="text">Would you want to see a problem like this in a future CTF?</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <div class="btn-group radio" data-toggle="buttons"> <label class="btn btn-primary"> <input type="radio" name="options" autocomplete="off" checked>Yes </label> <label class="btn btn-primary"> <input type="radio" name="options" autocomplete="off">No </label> </div></div></div><br><div class="row"> <div class="col-sm-2"></div><div class="col-sm-8"> <button type="submit" class="btn purple sm expand centerpad"><i class="material-icons">&#xE0B7;</i>SEND FEEDBACK</button> </div><div class="col-sm-2"></div></div></div></div></div>';
            var hint = "";
            for (var j = 0; j < problem.hints.length; j++){
              hint += problem.hints[j] + '\r\n';
            }
            var value = {"pid":problem.pid, "description": problem.description, category:convert[problem.category.toLowerCase()], "name":problem.name, "score": problem.score, "icon": icon[convert[problem.category.toLowerCase()]], "hint": hint};
            var html = S(str).template(value).s;
            $('#main').append(html);
          }
          else{
            var str = '<div class="problem{{category}}complete" data-toggle="collapse" data-target="#{{pid}}" aria-expanded="false"> <div class="icon"> <i class="material-icons">&#xE5CA;</i> </div><text class="name">{{name}}</text> <text class="value">{{score}}XP</text> </div><div class="problem-slide{{category}}collapse complete" id="{{pid}}"> <div class="selectbox"> <div class="select active" data-tab="problem"> <button><i class="material-icons">&#xE153;</i></button> </div><div class="select" data-tab="hint"> <button><i class="material-icons">&#xE887;</i></button> </div><div class="select" data-tab="feedback"> <button><i class="material-icons">&#xE8DD;</i></button> </div></div><div class="body problem-tab"> <h3 class="text">{{description}}</h3> </div><div class="body hidden hint-tab"> <h3 class="text">{{hint}}</h3> </div><div class="body hidden feedback-tab"> <div class="form-group" id="inputGroup"> <div class="row"> <div class="col-sm-6"> <h3 class="text">How much time did you spend?</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <input class="sliderTime" data-slider-id="ex1Slider" type="text" data-slider-min="0" data-slider-max="240" data-slider-step="15" data-slider-value="0"/> <text class="h3 sliderTimeDisplay">0:00</text> </div></div><br><div class="row"> <div class="col-sm-6"> <h3 class="text">How easy or challenging was the problem?</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <input class="sliderDifficulty" data-slider-id="ex1Slider" type="text" data-slider-min="1" data-slider-max="5" data-slider-step="1" data-slider-value="3"/> <text class="h3 sliderDifficultyDisplay">Average</text> </div></div><br><div class="row"> <div class="col-sm-6"> <h3 class="text">Rate your overall interest in the problem.</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <input class="sliderInterest" data-slider-id="ex1Slider" type="text" data-slider-min="1" data-slider-max="5" data-slider-step="1" data-slider-value="3"/> <text class="h3 sliderInterestDisplay">Average</text> </div></div><br><div class="row"> <div class="col-sm-6"> <h3 class="text">Would you want to see a problem like this in a future CTF?</h3> </div><div class="col-sm-6 vert-middle" style="margin-top: 0px"> <div class="btn-group radio" data-toggle="buttons"> <label class="btn btn-primary"> <input type="radio" name="options" autocomplete="off" checked>Yes </label> <label class="btn btn-primary"> <input type="radio" name="options" autocomplete="off">No </label> </div></div></div><br><div class="row"> <div class="col-sm-2"></div><div class="col-sm-8"> <button type="submit" class="btn purple sm expand centerpad"><i class="material-icons">&#xE0B7;</i>SEND FEEDBACK</button> </div><div class="col-sm-2"></div></div></div></div></div>';
            var hint = "";
            for (var j = 0; j < problem.hints.length; j++){
              hint += problem.hints[j] + '\r\n';
            }
            var value = {"pid":problem.pid, "description": problem.description, category:convert[problem.category.toLowerCase()], "name":problem.name, "score": problem.score, "icon": icon[convert[problem.category.toLowerCase()]], "hint": hint};
            var html = S(str).template(value).s;
            $('#main').append(html);
          }
        }
        $('.select').click(function(){
          var selection = $(this).attr('data-tab');
          $(this).siblings('div').removeClass('active');
          $(this).addClass('active');
          var bodies = $(this).parent().siblings('.body');
          for (var i = 0; i < bodies.length; i++){
            var local = bodies.eq(i);
            if(local.hasClass(selection + '-tab')){
              if(local.hasClass('hidden')){
                local.removeClass('hidden');
              }
            }
            else if (!local.hasClass('hidden')){
              local.addClass('hidden');
            }
          }
        });
        $('.input-group-btn').click(function(){
          var input = $(this).siblings('input').eq(0);
          var parent = $(this).parent();
          var help = parent.siblings('.help-block').eq(0);

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
