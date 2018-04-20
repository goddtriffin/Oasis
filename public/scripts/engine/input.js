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
			// face north
			OasisPlayer.face('north');
			break;
		case "ArrowDown":
			// face south
			OasisPlayer.face('south');
			break;
		case "ArrowLeft":
			// face west
			OasisPlayer.face('west');
			break;
		case "ArrowRight":
			// face east
			OasisPlayer.face('east');
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
			// face north
			break;
		case "ArrowDown":
			// face south
			break;
		case "ArrowLeft":
			// face west
			break;
		case "ArrowRight":
			// face east
			break;
	}
}