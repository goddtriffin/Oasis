// authentication
const login = require('./authentication/login').login;
const signup = require('./authentication/signup').signup;

// initializes the handler for client connection
function init (io) {
    // new connection
    io.on('connection', function (socket) {
        console.log('user connected');

        // login
        socket.on('login', login);

        // signup
        socket.on('signup', signup);

        // disconnection
        socket.on('disconnect', disconnect);
    });
}

// handles the disconnection of a user
function disconnect () {
    console.log('user disconnected');
}

// export
module.exports = {
    init
}