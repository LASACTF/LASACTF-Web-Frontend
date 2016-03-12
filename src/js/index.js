function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

if (Math.floor(Date.now() / 1000) < 1458406800) {
  var timespan = countdown(new Date("March 19, 2016 12:00:00 CDT"), function(ts) {
    $('#tdays').text(padDigits(ts.days, 2));
    $('#thours').text(padDigits(ts.hours, 2));
    $('#tmins').text(padDigits(ts.minutes, 2));
    $('#tsecs').text(padDigits(ts.seconds, 2));
  }, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS | countdown.MILLISECONDS);
} else {
  $('#ttext').text('left');
  var timespan = countdown(new Date("March 26, 2016 12:00:00 CDT"), function(ts) {
    $('#tdays').text(padDigits(ts.days, 2));
    $('#thours').text(padDigits(ts.hours, 2));
    $('#tmins').text(padDigits(ts.minutes, 2));
    $('#tsecs').text(padDigits(ts.seconds, 2));
  }, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS | countdown.MILLISECONDS);
}
$(function(){
  $('.navbar').addClass('locked');
});
