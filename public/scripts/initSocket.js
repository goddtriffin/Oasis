// handles turning on/off debug mode
const debug = false;

// turns on/off simple rendering
const simpleRender = false;

// intitialize socket.io client socket
const socket = io();

// handle when the server goes down
socket.on('disconnect', function () {
    location.href = "../pages/serverdown/";
});