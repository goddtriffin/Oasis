var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// allow access to everything in public folder
app.use(express.static('public'));

// home requested
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// new connection
io.on('connection', function (socket) {
    console.log('user connected');

    // login
    socket.on('login', function (login) {
        console.log('login attempted | username:', login.username, ' , password:', login.password);
        socket.emit('login failure', login);
    });

    // disconnection
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Server listening on *:3000');
});