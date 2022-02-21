require("log-timestamp");

// returns a random number between the bounds; both bounds inclusive
// (int) min , (int) max
function getRandInt (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generates random map of specified width/height that contains values between minn/max; both min/max inclusive
// (int) width , (int) height , (int) min , (int) max
function generateRandomMap (width, height, min, max) {
	// prep map container
	map = [];

	// for height/width
    for (let y = 0; y < height; y++) {
        let column = [];
        for (let x = 0; x < width; x++) {
			// generate values between min/max (inclusive)
            column.push(getRandInt(min, max));
        }
        map.push(column);
	}

	// finished
	return map;
}

// smooths a given map by setting all points' values as the average
// of all surrounding point values (including the one being looked at)
// ( [[int]] ) map
function smoothMap (map) {
	// cycle through every point in the map
	for (let y=0; y<map.length; y++) {
		for (let x=0; x<map[y].length; x++) {

			const surroundingHeightSum = sumSurroundingValues(map, x, y, true);
			const averageHeight = surroundingHeightSum / 9;
			map[y][x] = averageHeight;
		}
	}
}

// returns the sum of all the values in the 3x3
// grid surrounding the given point in the map
// ( [[int]] ) map , (int) x , (int) y , (boolean) worldWrap
function sumSurroundingValues (map, x, y, worldWrap) {
	// prep sum
	let sum = 0;

	// cycle through the 3x3 grid around the point being looked at
	for (let deltaY = -1; deltaY <= 1; deltaY++) {
		for (let deltaX = -1; deltaX <= 1; deltaX++) {

			// get point coordinate to sum
			let sumX = x + deltaX;
			let sumY = y + deltaY;

			// worldWrap will wrap points not inside the bounds of the map, back into it
			// (ie. (-1,-1) <=> (map.width-1, map.height-1))
			if (worldWrap) {
				// wrap sumY to map bounds
				if (sumY < 0) 						sumY += map.length;
				if (sumY > map.length - 1) 			sumY -= map.length;

				// wrap sumX to map bounds
				if (sumX < 0)						sumX += map[sumY].length;
				if (sumX > map[sumY].length - 1) 	sumX -= map[sumY].length;
			} else {
				// don't sum values outside the map bounds
				if (sumY < 0 || sumY > map.length - 1) continue;
				if (sumX < 0 || sumX > map[sumY].length - 1) continue;
			}

			// sum validated map point
			sum += map[sumY][sumX];
		}
	}

	// finished
	return sum;
}

// exports
module.exports = {
	getRandInt,
	generateRandomMap,
	smoothMap
}
