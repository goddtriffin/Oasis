//
//      Callbacks
//

// handles a new player joining
function playerJoined (username, stats) {
    // ignore updates about myself
    if (username === OasisPlayer.username)
        return;

        OasisPlayers[username] = new OtherPlayer(username, stats);
        console.log(username, 'joined the Oasis.');
}

// handles a player leaving
function playerLeft (username) {
    // ignore updates about myself
    if (username === OasisPlayer.username)
        return;

    if (OasisPlayers[username]) {
        delete OasisPlayers[username];
        console.log(username, 'left the Oasis.');
    } else {
        console.error('player left:', 'username doesn\'t exist.');
    }
}

// handles updating a player's location
function updatePlayerLocation (username, location) {
    // ignore updates about myself
    if (username === OasisPlayer.username)
        return;

    if (OasisPlayers[username]) {
        OasisPlayers[username].location = location;
    } else {
        console.error('update location:', 'username doesn\'t exist.');
    }
}

// loads data on all currently connected players
function loadConnectedPlayers (players) {
    Object.keys(players).forEach(function (username) {
        OasisPlayers[username] = new OtherPlayer(username, players[username]);
    });
}

// join the Oasis
function joinGame () {
    // prep user data
    const username = OasisPlayer.username;

    const stats = {};
    stats.location = OasisPlayer.location;
    stats.size = OasisPlayer.size;
    stats.speed = OasisPlayer.speed;
    stats.color = 'blue';

    // join
    socket.emit('join', username, stats);
}