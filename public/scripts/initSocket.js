// handles turning on/off debug mode
let debug = false;

// turns on/off simple rendering
let simpleRender = false;

// intitialize socket.io client socket
const socket = io();

// handle when the server goes down
socket.on("disconnect", function () {
    console.log("server went down");
    alert("Server went down! Please refresh the browser!");
});
