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
	// handle what to do on key press downs
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
			if (OasisPlayer.directionalKeys.indexOf('up') === -1) OasisPlayer.directionalKeys.push('up');
			break;
		case "ArrowDown":
			// face south
			if (OasisPlayer.directionalKeys.indexOf('down') === -1) OasisPlayer.directionalKeys.push('down');
			break;
		case "ArrowLeft":
			// face west
			if (OasisPlayer.directionalKeys.indexOf('left') === -1) OasisPlayer.directionalKeys.push('left');
			break;
		case "ArrowRight":
			// face east
			if (OasisPlayer.directionalKeys.indexOf('right') === -1) OasisPlayer.directionalKeys.push('right');
			break;

		case " ":
			// punch
			OasisPlayer.punch((getRandInt(0, 1) === 1)? 'left' : 'right');
			break;
	}
}

// handles the event of keys being released
function keyUpCallback (e) {
	switch (e.key) {
		case "w":
			// stop move up
			OasisPlayer.up = false;
			break;
		case "s":
			// stop move down
			OasisPlayer.down = false;
			break;
		case "a":
			// stop move left
			OasisPlayer.left = false;
			break;
		case "d":
			// stop move right
			OasisPlayer.right = false;
			break;

		case "ArrowUp":
			// stop face north
			removeFromList(OasisPlayer.directionalKeys, 'up');
			break;
		case "ArrowDown":
			// stop face south
			removeFromList(OasisPlayer.directionalKeys, 'down');
			break;
		case "ArrowLeft":
			// stop face west
			removeFromList(OasisPlayer.directionalKeys, 'left');
			break;
		case "ArrowRight":
			// stop face east
			removeFromList(OasisPlayer.directionalKeys, 'right');
			break;
	}
}