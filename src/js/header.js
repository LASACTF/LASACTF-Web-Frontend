$(function() {
  $( ".dropdown-toggle" ).hover(
      function(){
        $('.dropdown-menu').slideDown(200)
        $('.btn.profile').addClass('open');
        setTimeout(function() { $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "1"); }, 250);

      },
      function(){
        $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "0");

        setTimeout(function() {
          $('.dropdown-menu').slideUp(200);
          $('.btn.profile').removeClass('open');
        }, 250);

      }
    );
});
