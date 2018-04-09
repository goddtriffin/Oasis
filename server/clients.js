// authentication
const login = require('./authentication/login').login;
const signup = require('./authentication/signup').signup;

// game
const players = {};

// initializes the handler for client connection
function init (io) {
    // new connection
    io.on('connection', function (socket) {
        console.log('\nuser connected');

        // authentication
        socket.on('login', login);
        socket.on('signup', signup);

        // join
        const boundJoin = join.bind(io);
        socket.on('join', boundJoin);

        // send connected players
        socket.on('send connected players', sendConnectedPlayers);

        // location update
        const boundUpdateLocation = updateLocation.bind(io);
        socket.on('location update', boundUpdateLocation);

        // disconnection ; leave the oasis
        const boundDisconnect = disconnect.bind(io);
        socket.on('disconnect', boundDisconnect);
    });
}

// handles player joining the Oasis
function join (username, stats) {
    // tell the others
    this.emit('player joined', username, stats);

    // keep a record of this player
    players[username] = stats;

    console.log('\n', username, 'joined the Oasis.');
}


// handles sending data on all of the currently connected players
function sendConnectedPlayers () {
    this.emit('load connected players', players)
}

// handles a player updating their location
function updateLocation (username, location) {
    // tell the others
    this.emit('update player location', username, location);

    // update this player's record
    if (players[username]) {
        players[username].location = location;
    } else {
        console.error('update location: no player data tied to username:', username);
    }
}

// handles a player leaving the Oasis
function disconnect (username) {
    // tell the others
    this.emit('player left', username);

    // delete the record of this player
    delete players[username];

    // :(
    console.log('\n', username, 'left the Oasis.');
}

// export
module.exports = {
    init
}