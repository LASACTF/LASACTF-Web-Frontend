$.ajax({
  url: '/api/user/firstlogin',
  type:'GET',
  success: function(result) {
    if(result.status == 1) {
      if(result.data.firstlogin) {
        window.location.href = '/reset';
      }
    }
  }
});

$(function() {
  $('#headerChat').addClass('active');
  $('.navbar').addClass('chat');
});
