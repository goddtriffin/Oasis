//
//      Initializers
//

// container for all things that need to be loaded
const loading = {
    world: false,
    otherPlayers: false
}

// initializes the game
function initGame () {
    // load game canvas (set as global var)
    OasisCanvas = createGameCanvas();
    if (OasisCanvas) document.body.appendChild(OasisCanvas);

    // get game canvas context (set as global var)
    OasisCanvasContext = OasisCanvas.getContext('2d');

    // initialize this clients player
    initPlayer();

    // initialize game camera
    initGameCamera();

    // attach keyboard listeners
    attachKeyDownHandler();
    attachKeyUpHandler();

    // attach game listeners
    attachGameListeners();

    // load world
    initWorld();

    // initialize container for other players
    initOtherPlayers();

    // start the game!
    startGame();
}

// attaches game listeners
function attachGameListeners () {
    socket.on('load world', loadWorld);
    socket.on('load connected players', loadConnectedPlayers);
    socket.on('player joined', playerJoined);
    socket.on('player left', playerLeft);
    socket.on('update player location', updatePlayerLocation);
    socket.on('update player direction', updatePlayerDirection);
    socket.on('punch', playerPunched);
}

// joins the Oasis and starts game loop (if all game data has been loaded)
function startGame () {
    // check to see if everything has been loaded
    let everythingLoaded = true;
    Object.keys(loading).forEach(function (key) {
        if (!loading[key]) everythingLoaded = false;
    });

    // only join the Oasis and start ticking/rendering if all game data has been loaded
    if (everythingLoaded) {
        // THE WHOLE GAME HAS LOADED
        joinGame();

        // start game loop
        startGameLoop(tick, render, 60);
    }
}

// starts the game loop
function startGameLoop (tickCallback, renderCallback, desired_ups) {
	setInterval(function () {
		tickCallback();
		renderCallback();
	}, (1000 / desired_ups));
}

//
//      Game Loops
//

// updates the state of all game data
function tick () {
    // update all other player's data
    tickOtherPlayers();

    // update this clients player data
    OasisPlayer.tick();

    // update the game camera
    OasisCamera.tick();
}

// renders all necessary game data to the screen
function render () {
    // wipe the screen for the next render pass
    clearGameScreen('white');

    // render the world
    OasisWorld.render();

    // render all the other players
    renderOtherPlayers();

    // render this clients player
    OasisPlayer.render();
}