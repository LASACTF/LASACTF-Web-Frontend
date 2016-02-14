function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
$(function() {
  $('#desktop-dropdown-toggle').hover(
      function(){
        $('#desktop-dropdown').slideDown(200)
        $('.btn.profile').addClass('open');
        setTimeout(function() {
          $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "1");
        }, 200);
      },
      function(){
        $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "0");

        setTimeout(function() {
          $('#desktop-dropdown').slideUp(200);
          setTimeout(function() {
            $('.btn.profile').removeClass('open');
          }, 200);
        }, 250);
      }
    );
    var timespan = countdown(new Date("March 19, 2016 12:00:00 CST"), function(ts) {
      $('#tdays').text(padDigits(ts.days,2));
      $('#thours').text(padDigits(ts.hours,2));
      $('#tmins').text(padDigits(ts.minutes,2));
      $('#tsecs').text(padDigits(ts.seconds,2));
    }, countdown.DAYS | countdown.HOURS|countdown.MINUTES|countdown.SECONDS|countdown.MILLISECONDS);

    if (localStorage.getItem("nocountdown") == "true"){
      $('#countdown').addClass("hidden");
    }
});
