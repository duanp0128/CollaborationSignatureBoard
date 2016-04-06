var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));

var is_clicked_a = false;
var is_clicked_b = false;

server.listen(8080, function() {
  console.log("Server running on 127.0.0.1:8080");
});

app.get('/main', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/usera', function(req, res) {
  res.sendFile(__dirname + '/public/views/a.html');
});

app.get('/userb', function(req, res) {
  res.sendFile(__dirname + '/public/views/b.html');
});

app.get('/userc', function(req, res) {
  res.sendFile(__dirname + '/public/views/c.html');
});

app.get('/userd', function(req, res) {
  res.sendFile(__dirname + '/public/views/d.html');
});

io.on('connection', function(socket) {
  socket.on('draw_line_a', function(data) {
    io.emit('main_draw_a', data);
  });


  socket.on('reset_all', function(msg) {
    is_clicked_a = false;
    is_clicked_b = false;

    io.emit('server_reset', "server: btn reset is clicked");
    io.emit('main_reset_a', "server: btn reset a is clicked");
    io.emit('main_reset_b', "server: btn reset b is clicked");
  });

  socket.on('main_reset', function(msg) {
    io.emit('reset_client', "server: btn reset is clicked");
  });


  socket.on('draw_line_b', function(data) {
    io.emit('main_draw_b', data);
  });

  socket.on('click_a', function(msg) {
    is_clicked_a = true;
    if (typeof(is_clicked_b) != 'undefined' && is_clicked_b == true) {
      io.emit('main_a', "server: btn a is clicked");
      io.emit('main_b', "server: btn a is clicked");
    }

  });
  socket.on('click_b', function(msg) {
    is_clicked_b = true;
    if (typeof(is_clicked_a) != 'undefined' && is_clicked_a == true) {
      io.emit('main_a', "server: btn a is clicked");
      io.emit('main_b', "server: btn a is clicked");
    }
  });
});
