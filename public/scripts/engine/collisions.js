// Checks for a collision one step in the future
function collideUp (primaryTop, secondaryBottom, step) {
	step = Math.abs(step);

	if (primaryTop - step < secondaryBottom) {
		return true;
	}

	return false;
}

// Checks for a collision one step in the future
function collideDown (primaryBottom, secondaryTop, step) {
	step = Math.abs(step);

	if (primaryBottom + step > secondaryTop) {
		return true;
	}

	return false;
}

// Checks for a collision one step in the future
function collideLeft (primaryLeft, secondaryRight, step) {
	step = Math.abs(step);

	if (primaryLeft - step < secondaryRight) {
		return true;
	}

	return false;
}

// Checks for a collision one step in the future
function collideRight (primaryRight, secondaryLeft, step) {
	step = Math.abs(step);

	if (primaryRight + step > secondaryLeft) {
		return true;
	}

	return false;
}

// checks if two rectangles intersect
// ({location , size}) rect1 , ({location , size}) rect2
function rectangleIntersects (rect1, rect2) {
    // gather collision data
    const up = collideUp(rect1.location.y, rect2.location.y + rect2.size.height, 0);
    const down = collideDown(rect1.location.y + rect1.size.height, rect2.location.y, 0);
    const left = collideLeft(rect1.location.x, rect2.location.x + rect2.size.width, 0);
    const right = collideRight(rect1.location.x + rect1.size.width, rect2.location.x, 0);

    // check for possible collisions
    return ((up && left) || (up && right) || (down && left) || (down && right));
}