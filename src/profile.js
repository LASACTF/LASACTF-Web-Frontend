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

$(function() {
  $.ajax({
     url: '/api/user/status',
     success: function(data) {
      console.log(data)
     },
     type: 'GET'
  });
  $( ".dropdown-toggle" ).hover(
    function(){
      $('.dropdown-menu').slideDown(200);
      setTimeout(function() { $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "1"); }, 250);

    },
    function(){
      $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "0");
      setTimeout(function() { $('.dropdown-menu').slideUp(200); }, 250);

    }
  );
});
