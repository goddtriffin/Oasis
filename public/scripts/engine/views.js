// returns game canvas
function createGameCanvas () {
    // check for element creation errors
    if (elementCreationErrors('gameCanvas')) return;

    // create game canvas
    const gameCanvas = document.createElement('canvas');

    // set attributes
    gameCanvas.setAttribute('id', 'gameCanvas');

    setCanvasFullscreen(gameCanvas);

    // return completed game canvas
    return gameCanvas;
}

// set the size of the canvas to the window's size
function setCanvasFullscreen (canvas) {
	document.body.style.margin = 0;
	document.body.style.padding = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// fills the game canvas with a specified color
function clearGameScreen (color) {
	OasisCanvasContext.fillStyle = color;
	OasisCanvasContext.fillRect(0, 0, OasisCanvas.width, OasisCanvas.height);
}