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
    OasisPlayer = new Player(localStorage.getItem('Oasis-session-username'));
}

//
//      Game Loops
//

// updates the state of all game data
function tick () {
    OasisPlayer.tick();
}

// renders all necessary game data to the screen
function render () {
    clearGameScreen('white');

    OasisPlayer.render();
}