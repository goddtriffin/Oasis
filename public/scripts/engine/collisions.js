// ({location , size}) primaryRect - the one that's moving
// ({location , size}) secondaryRect - the one to check against
// (Integer) step - the number of pixels to look ahead

// returns true if the rectangle's are intersecting
function intersects (primaryRect, secondaryRect) {
	return !(
		primaryRect.location.y > secondaryRect.location.y + secondaryRect.size.height 	|| // r1.top 	> r2.bottom
		primaryRect.location.y + primaryRect.size.height < secondaryRect.location.y 	|| // r1.bottom < r2.top
		primaryRect.location.x > secondaryRect.location.x + secondaryRect.size.width	|| // r1.left 	> r2.right
		primaryRect.location.x + primaryRect.size.width < secondaryRect.location.x		   // r1.right 	< r2.left
	);
}

// returns true on upwards collision (one step in the future), false otherwise
function collideUp (primaryRect, secondaryRect, step) {
	// make sure step is positive
	step = Math.abs(step);

	// create temporary test location
	primaryRect.location.y -= step;

	// check if future location will intersect
	return intersects(primaryRect, secondaryRect);
}

// returns true on downwards collision (one step in the future), false otherwise
function collideDown (primaryRect, secondaryRect, step) {
	// make sure step is positive
	step = Math.abs(step);

	// create temporary test location
	primaryRect.location.y += step;

	// check if future location will intersect
	return intersects(primaryRect, secondaryRect);
}

// returns true on leftwards collision (one step in the future), false otherwise
function collideLeft (primaryRect, secondaryRect, step) {
	// make sure step is positive
	step = Math.abs(step);

	// create temporary test location
	primaryRect.location.x -= step;

	// check if future location will intersect
	return intersects(primaryRect, secondaryRect);
}

// returns true on rightwards collision (one step in the future), false otherwise
function collideUp (primaryRect, secondaryRect, step) {
	// make sure step is positive
	step = Math.abs(step);

	// create temporary test location
	primaryRect.location.x += step;

	// check if future location will intersect
	return intersects(primaryRect, secondaryRect);
}