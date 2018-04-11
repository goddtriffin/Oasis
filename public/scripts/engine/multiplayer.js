//
//      Callbacks
//

// initializes the container for other players
function initOtherPlayers () {
    // create container
    OasisPlayers = {};

    // ask for all the users
    socket.emit('send connected players');
}

// loads data on all currently connected players
function loadConnectedPlayers (players) {
    Object.keys(players).forEach(function (socketID) {
        OasisPlayers[socketID] = new OtherPlayer(players[socketID].username, players[socketID].stats);
    });
}

// join the Oasis
function joinGame () {
    // prep username
    const username = OasisPlayer.username;

    // prep other user stats
    const stats = {};
    stats.location = OasisPlayer.location;
    stats.size = OasisPlayer.size;
    stats.speed = OasisPlayer.speed;
    stats.color = OasisPlayer.color;
    stats.facing = OasisPlayer.facing;

    // join
    socket.emit('join', username, stats);
}

// handles a new player joining
function playerJoined (socketID, username, stats) {
    OasisPlayers[socketID] = new OtherPlayer(username, stats);
}

// handles a player leaving
function playerLeft (socketID) {
    delete OasisPlayers[socketID];
}

// handles updating a player's location
function updatePlayerLocation (socketID, location) {
    OasisPlayers[socketID].location = location;
}

// handles updating a player's direction
function updatePlayerDirection (socketID, direction) {
    OasisPlayers[socketID].facing = direction;
}