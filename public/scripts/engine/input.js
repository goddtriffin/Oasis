// attaches the key down event
function attachKeyDownHandler () {
	window.addEventListener('keydown', keyDownCallback);
}

// attaches the key up event
function attachKeyUpHandler () {
	window.addEventListener('keyup', keyUpCallback);
}

// handles the event of keys being pressed down
function keyDownCallback (e) {
	switch (e.key) {
		case "w":
			// move up
			OasisPlayer.up = true;
			break;
		case "s":
			// move down
			OasisPlayer.down = true;
			break;
		case "a":
			// move left
			OasisPlayer.left = true;
			break;
		case "d":
			// move right
			OasisPlayer.right = true;
			break;

		case "ArrowUp":
			// face up
			OasisPlayer.face('up');
			break;
		case "ArrowDown":
			// face down
			OasisPlayer.face('down');
			break;
		case "ArrowLeft":
			// face left
			OasisPlayer.face('left');
			break;
		case "ArrowRight":
			// face right
			OasisPlayer.face('right');
			break;
	}
}

// handles the event of keys being released
function keyUpCallback (e) {
	switch (e.key) {
		case "w":
			// move up
			OasisPlayer.up = false;
			break;
		case "s":
			// move down
			OasisPlayer.down = false;
			break;
		case "a":
			// move left
			OasisPlayer.left = false;
			break;
		case "d":
			// move right
			OasisPlayer.right = false;
			break;

		case "ArrowUp":
			// face up
			break;
		case "ArrowDown":
			// face down
			break;
		case "ArrowLeft":
			// face left
			break;
		case "ArrowRight":
			// face right
			break;
	}
}