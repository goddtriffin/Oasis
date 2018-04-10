const players = {};  // socketID: { username , stats }

//
//      Callbacks
//

// handles sending data on all of the currently connected players
function sendConnectedPlayers () {
    this.emit('load connected players', players);
}

// handles player joining the Oasis
function join (username, stats) {
    // tell the others
    this.broadcast.emit('player joined', this.id, username, stats);

    // keep a record of this player
    players[this.id] = {username, stats};

    console.log('\n' + username, '(' + this.id + ')', 'joined the Oasis.');
}

// handles a player updating their location
function updateLocation (location) {
    // tell the others
    this.broadcast.emit('update player location', this.id, location);

    // update this player's record
    players[this.id].stats.location = location;
}

// handles a socket closure
function disconnect () {
    // leave the Oasis
    leave(this);

    console.log(this.id, 'disconnected.');
}

// handles a clean departure from the Oasis
function leave (socket) {
    // console.log(this);

    // tell the others
    socket.broadcast.emit('player left', socket.id);

    // save the user's data right here right before deleting it
    // TODO

    // :(
    console.log('\n' + players[socket.id].username, '(' + socket.id + ')', 'left the Oasis.');

    // delete the record of this player
    delete players[socket.id];
}

// exports
module.exports = {
    sendConnectedPlayers,
    join,
    updateLocation,
    disconnect
}