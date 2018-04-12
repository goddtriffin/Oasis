// returns a random number between the bounds; both bounds inclusive
// (int) min , (int) max
function getRandInt (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// exports
module.exports = {
	getRandInt
}