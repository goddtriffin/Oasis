// express / socket.io
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// authentication
const login = require('./authentication/login').login;
const signup = require('./authentication/signup').signup;

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
    socket.on('login', login);

    // signup
    socket.on('signup', signup);

    // disconnection
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Server listening on *:3000');
});