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
			// up
			OasisPlayer.up = true;
			break;
		case "s":
			// down
			OasisPlayer.down = true;
			break;
		case "a":
			// left
			OasisPlayer.left = true;
			break;
		case "d":
			// right
			OasisPlayer.right = true;
			break;
		case "ArrowUp":
			// up
			break;
		case "ArrowDown":
			// down
			break;
		case "ArrowLeft":
			// left
			break;
		case "ArrowRight":
			// right
			break;
	}
}

// handles the event of keys being released
function keyUpCallback (e) {
	switch (e.key) {
		case "w":
			// up
			OasisPlayer.up = false;
			break;
		case "s":
			// down
			OasisPlayer.down = false;
			break;
		case "a":
			// left
			OasisPlayer.left = false;
			break;
		case "d":
			// right
			OasisPlayer.right = false;
			break;
		case "ArrowUp":
			// up
			break;
		case "ArrowDown":
			// down
			break;
		case "ArrowLeft":
			// left
			break;
		case "ArrowRight":
			// right
			break;
	}
}