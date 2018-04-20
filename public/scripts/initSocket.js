const debug = false;

// intitialize socket.io client socket
const socket = io();

// handle when the server goes down
socket.on('disconnect', function () {
    location.href = "../pages/serverdown/";
});