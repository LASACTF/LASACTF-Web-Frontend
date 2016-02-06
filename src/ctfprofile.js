function resize()
{
  var width = $(this).width(); //this = window
  var posX = width - ($(".navbar-container").width());
  //$(".compete#left-panel").css("width", posX);
  $(".compete#left-panel button").css("padding-left", posX / 2 + 14);
}

$(window).on('load', function(){
  resize();
});
$(window).on('resize', function(){
  resize();
});
