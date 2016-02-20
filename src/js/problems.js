$(function() {
  $('#headerProblems').addClass('active');
  $('.navbar').addClass('problems');
});

//Call these only when creating the div containing the slider
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
