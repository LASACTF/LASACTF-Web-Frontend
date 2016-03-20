function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

if (Math.floor(Date.now() / 1000) < 1458406800) {
  var timespan = countdown(new Date("March 19, 2016 12:00:00 CDT"), function(ts) {
    $('#itdays').text(padDigits(ts.days, 2));
    $('#ithours').text(padDigits(ts.hours, 2));
    $('#itmins').text(padDigits(ts.minutes, 2));
    $('#itsecs').text(padDigits(ts.seconds, 2));
  }, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS | countdown.MILLISECONDS);
} else {
  var timespan = countdown(new Date("March 26, 2016 15:00:00 CDT"), function(ts) {
    $('#ittext').text('left');
    $('#itdays').text(padDigits(ts.days, 2));
    $('#ithours').text(padDigits(ts.hours, 2));
    $('#itmins').text(padDigits(ts.minutes, 2));
    $('#itsecs').text(padDigits(ts.seconds, 2));
  }, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS | countdown.MILLISECONDS);
}
$(function(){
  $('.nav-countdown').addClass('hidden');
  $('.navbar').addClass('index');
  $('.headway').addClass('hidden');
});
