function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
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
    var timespan = countdown(new Date("March 19, 2016 12:00:00 CST"), function(ts) {
      $('#tdays').text(padDigits(ts.days,2));
      $('#thours').text(padDigits(ts.hours,2));
      $('#tmins').text(padDigits(ts.minutes,2));
      $('#tsecs').text(padDigits(ts.seconds,2));
    }, countdown.DAYS | countdown.HOURS|countdown.MINUTES|countdown.SECONDS|countdown.MILLISECONDS);

});