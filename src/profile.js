$(function() {
  $.ajax({
     url: 'https://lasactf.com/api/user/status',
     success: function(data) {
      console.log(data)
     },
     type: 'GET'
  });
});
