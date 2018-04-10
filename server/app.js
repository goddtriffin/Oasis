// express / socket.io
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// clients
const clients = require('./clients');

// allow access to everything in these folders
app.use(express.static('public'));

// home requested
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// handle the connection of clients
clients.init(io);

// start server
http.listen(8633, function () {
    console.log('Server listening on *:8633!');
});