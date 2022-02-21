require("log-timestamp");

// world
const world = require('./world');
world.generateRealistic(1000, 1000, 25);

// game
const players = {};  // socketID: { username , stats }

//
//      Callbacks
//

// handles sending world tilemap data to the joining user
function sendWorld () {
    this.emit('load world', world.getTilemap());
}

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

    console.log(username, '(' + this.id + ')', 'joined the Oasis.');
}

// handles a player updating their location
function updateLocation (location) {
    if (!players[this.id]) {
        return;
    }

    // tell the others
    this.broadcast.emit('update player location', this.id, location);

    // update this player's record
    players[this.id].stats.location = location;
}

// handles a player updating their direction
function updateDirection (direction) {
    if (!players[this.id]) {
        return;
    }

    // tell the others
    this.broadcast.emit('update player direction', this.id, direction);

    // update this player's record
    players[this.id].stats.facing = direction;
}

// handles a player's punch event
function punch (hand) {
    // tell the others
    this.broadcast.emit('punch', this.id, hand);
}

// handles a player being successfully punched
function hit (socketID, damage) {
    if (!players[socketID]) {
        return;
    }

    // tell the others
    this.broadcast.emit('player hit', socketID, damage);

    // damage the player being hit
    players[socketID].stats.health -= damage;

    // if player health is 0 or below, send kill player event
    if (players[socketID].stats.health <= 0) {
        this.broadcast.emit('player killed', socketID);

        // reset killed player's health
        players[socketID].stats.health = 100;

        // increase killer's killCount
        players[this.id].stats.killCount++;
        this.broadcast.emit('update kill count', this.id, players[this.id].stats.killCount);
        this.emit('update kill count', this.id, players[this.id].stats.killCount);
    }
}

// handles a socket closure
function disconnect () {
    // leave the Oasis
    leave(this);

    console.log(this.id, 'disconnected.');
}

// handles a clean departure from the Oasis
function leave (socket) {
    // player wasn't in the Oasis yet
    if (!players[socket.id]) {
        return;
    }

    // tell the others
    socket.broadcast.emit('player left', socket.id);

    // save the user's data right here right before deleting it
    // TODO

    // :(
    console.log(players[socket.id].username, '(' + socket.id + ')', 'left the Oasis.');

    // delete the record of this player
    delete players[socket.id];
}

// exports
module.exports = {
    sendWorld,
    sendConnectedPlayers,
    join,
    updateLocation,
    updateDirection,
    punch,
    hit,
    disconnect
};
