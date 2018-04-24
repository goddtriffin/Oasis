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
    socket.on('player hit', playerHit);
    socket.on('player killed', playerKilled);
    socket.on('update kill count', updateKillCount);
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

    // render live players
    renderLivePlayers();

    // render all kill counts
    renderLeaderboard();
}

// renders the count of all players currently connected to the Oasis
function renderLivePlayers () {
    // render number of players currently logged into the Oasis
    OasisCanvasContext.fillStyle = 'black';
    OasisCanvasContext.font = "20px Arial";
    OasisCanvasContext.fillText(
        '' + (Object.keys(OasisPlayers).length + 1) + ' players live',
        OasisCanvas.width - 200,
        50
    );
}

// render all kill counts to the screen
function renderLeaderboard () {
    // set font color/size
    OasisCanvasContext.fillStyle = 'black';
    OasisCanvasContext.font = "17px Arial";

    // render leaderboard title
    OasisCanvasContext.fillText(
        'Leaderboard:',
        OasisCanvas.width - 200,
        75
    );

    // render client's kill count first
    OasisCanvasContext.fillText(
        '' + OasisPlayer.username + ': ' + OasisPlayer.killCount,
        OasisCanvas.width - 200,
        75 + 17
    );

    // get all connected player's socket ids
    const socketIDs = Object.keys(OasisPlayers);

    for (let i=0; i<socketIDs.length; i++) {
        OasisCanvasContext.fillText(
            '' + OasisPlayers[socketIDs[i]].username + ': ' + OasisPlayers[socketIDs[i]].killCount,
            OasisCanvas.width - 200,
            90 + (i * 15) + 17
        );
    }
}