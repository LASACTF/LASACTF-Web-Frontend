function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function getProfileFontSize(name) {
  var c = name.length;
  if (c < 10)
    return 26;
  if (c < 15)
    return 18;
  if (c < 20)
    return 14;
}

function onLogout() {
  $.ajax({
    url: '/api/user/logout',
    success: function(result) {
      localStorage.removeItem("username");
      window.location.href = "/login";
    },
    type: 'GET'
  });
}
$.ajax({
  url: '/api/user/status',
  success: function(result) {
    $(function(){
      if (result.status == 1 && result.data.logged_in === true) {
        var extra = JSON.parse(result.data.extra);
        $('#headerUsername').text(" " + result.data.username);
        $('#headerUsername').css("font-size", getProfileFontSize(result.data.username).toString() + "px");
        localStorage.setItem("username", result.data.username);
        $('.loggedout').addClass('hidden');
      }
      else if ( result.status == 1 && result.data.logged_in === false){
        $('.loggedin').addClass('hidden');
      }
      $('.navbar-right').removeClass('hidden');
    });

  },
  type: 'GET'
});
$(function() {

  //Bootstrap fix
  $('#desktop-dropdown a').click(function() {
    if ($(this).attr('id') != 'actionLogout')
      window.location.href = $(this).attr('href');
  });
  $('#desktop-dropdown-toggle').hover(
    function() {
      $('#desktop-dropdown').slideDown(200);
      $('.btn.profile').addClass('open');
      setTimeout(function() {
        $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "1");
      }, 200);
    },
    function() {
      $('.navbar .nav li.button ul.user-dropdown .btn').css("opacity", "0");

      setTimeout(function() {
        $('#desktop-dropdown').slideUp(200);
        setTimeout(function() {
          $('.btn.profile').removeClass('open');
        }, 200);
      }, 250);
    }
  );
  if (Math.floor(Date.now() / 1000) < 1458406800) {
    countdown(new Date("March 19, 2016 12:00:00 CDT"), function(ts) {
      $('#tdays').text(padDigits(ts.days, 2));
      $('#thours').text(padDigits(ts.hours, 2));
      $('#tmins').text(padDigits(ts.minutes, 2));
      $('#tsecs').text(padDigits(ts.seconds, 2));
    }, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS | countdown.MILLISECONDS);
  } else {
    $('#ttext').text(' left');
    countdown(new Date("March 26, 2016 12:00:00 CDT"), function(ts) {
      $('#tdays').text(padDigits(ts.days, 2));
      $('#thours').text(padDigits(ts.hours, 2));
      $('#tmins').text(padDigits(ts.minutes, 2));
      $('#tsecs').text(padDigits(ts.seconds, 2));
    }, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS | countdown.MILLISECONDS);
  }

  if (localStorage.getItem("nocountdown") == "true") {
    $('#countdown').addClass("hidden");
  }

});
