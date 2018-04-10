// authentication
const login = require('./authentication/login').login;
const signup = require('./authentication/signup').signup;

// game
const game = require('./game');

// initializes the handler for client connection
function init (io) {
    // new connection
    io.on('connection', function (socket) {
        console.log('\n' + socket.id, 'connected.');

        // authentication
        socket.on('login', login);
        socket.on('signup', signup);

        // send connected players
        socket.on('send connected players', game.sendConnectedPlayers);
        socket.on('join', game.join);
        socket.on('location update', game.updateLocation);

        // disconnection
        socket.on('disconnect', game.disconnect);
    });
}

// export
module.exports = {
    init
}