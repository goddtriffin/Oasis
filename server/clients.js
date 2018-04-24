// authentication
const login = require('./authentication/login').login;
const signup = require('./authentication/signup').signup;

// game
const game = require('./engine/game');

// initializes the handler for client connection
function init (io) {
    // new connection
    io.on('connection', function (socket) {
        console.log('\n' + socket.id, 'connected.');

        // authentication
        socket.on('login', login);
        socket.on('signup', signup);

        // game
        socket.on('send world', game.sendWorld);
        socket.on('send connected players', game.sendConnectedPlayers);
        socket.on('join', game.join);
        socket.on('location update', game.updateLocation);
        socket.on('direction update', game.updateDirection);
        socket.on('punch', game.punch);
        socket.on('hit', game.hit);

        // disconnection
        socket.on('disconnect', game.disconnect);
    });
}

// export
module.exports = {
    init
}