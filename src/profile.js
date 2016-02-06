$(function() {
  $.ajax({
     url: '/api/user/status',
     success: function(data) {
      console.log(data)
     },
     type: 'GET'
  });
});
