// initializes the game
function initGame () {
    // load game canvas (set as global var)
    gameCanvas = createGameCanvas();
    if (gameCanvas) document.body.appendChild(gameCanvas);

    // get game canvas context (set as global var)
    ctx = gameCanvas.getContext('2d');

    // test
    test();
}

// test
function test () {
    // set background color as red
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // hello world
    ctx.fillStyle = 'black';
    ctx.font = "30px Arial";
    ctx.fillText('Hello World!', 10, 50);
}