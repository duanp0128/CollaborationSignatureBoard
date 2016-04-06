$(function() {
  socket = io();

  $("#btn-a").click(function() {
    $("#btn-a").hide();
    socket.emit("click_a", "click btn a");
  });

  $("#btn-b").click(function() {
    $("#btn-b").hide();
    socket.emit("click_b", "click btn b");
  });

  socket.on('server_reset', function() {
  	$("#btn-a").show();
  	$("#btn-b").show();
	socket.emit('main_reset', "server: btn reset is clicked");
  });

});
