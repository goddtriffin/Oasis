//
//      Initializers
//

// initializes the game
function initGame () {
    // load game canvas (set as global var)
    OasisCanvas = createGameCanvas();
    if (OasisCanvas) document.body.appendChild(OasisCanvas);

    // get game canvas context (set as global var)
    OasisCanvasContext = OasisCanvas.getContext('2d');

    // initialize this clients player
    initPlayer();

    // attach keyboard listeners
    attachKeyDownHandler();
    attachKeyUpHandler();

    // attach game listeners
    attachGameListeners();

    // initialize container for other players
    initOtherPlayers();

    // LOAD ALL RESOURCES NEEDED FROM THE SERVER
    // ie. world map

    // THE WHOLE GAME HAS LOADED
    joinGame();

    // start game loop
    startGameLoop(tick, render, 60);
}

// starts the game loop
function startGameLoop (tickCallback, renderCallback, desired_ups) {
	setInterval(function () {
		tickCallback();
		renderCallback();
	}, (1000 / desired_ups));
}

// initializes this clients player
function initPlayer () {
    // load client player stats
    const username = localStorage.getItem('Oasis-session-username');

    const stats = {};
    stats.location = new Location(OasisCanvas.width / 2, OasisCanvas.height / 2);
    stats.size = new Size(20, 20);
    stats.speed = 5;
    stats.color = 'red';

    // create this clients player
    OasisPlayer = new ClientPlayer(username, stats);
}

// attaches game listeners
function attachGameListeners () {
    socket.on('player joined', playerJoined);
    socket.on('player left', playerLeft);
    socket.on('update player location', updatePlayerLocation);
    socket.on('load connected players', loadConnectedPlayers);
}

// initializes the container for other players
function initOtherPlayers () {
    // create container
    OasisPlayers = {};

    // ask for all the users
    socket.emit('send connected players');
}

//
//      Game Loops
//

// updates the state of all game data
function tick () {
    // update all other player's data
    // ???

    // update this clients player data
    OasisPlayer.tick();
}

// renders all necessary game data to the screen
function render () {
    // wipe the screen for the next render pass
    clearGameScreen('white');

    // render all the other players
    Object.keys(OasisPlayers).forEach(function (username) {
        OasisPlayers[username].render();
    });

    // render this clients player
    OasisPlayer.render();
}