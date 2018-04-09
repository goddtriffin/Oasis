// returns game canvas
function createGameCanvas () {
    // check for element creation errors
    if (elementCreationErrors('gameCanvas')) return;

    // create game canvas
    const gameCanvas = document.createElement('canvas');

    // set attributes
    gameCanvas.setAttribute('id', 'gameCanvas');

    // return completed game canvas
    return gameCanvas;
}