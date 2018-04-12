// rng
const utils = require('./utils');

// world
let tilemap;

// returns the world's tilemap
function getTilemap () {
    return tilemap;
}

// generates a random world of a specified width/height
function generateRandom (width, height) {
    tilemap = [];
    for (let y = 0; y < height; y++) {
        let column = [];
        for (let x = 0; x < width; x++) {
            column.push(utils.getRandInt(0, 3));
        }
        tilemap.push(column);
    }
}

// exports
module.exports = {
    getTilemap,
    generateRandom
}