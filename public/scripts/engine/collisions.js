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
	step = Math.abs(step);


}