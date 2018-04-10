// World model
// 
class World {
    constructor () {
        // load the actual world tiles from the server
        this.load();
    }

    // loads the game world from the server
    load () {
        /*
        socket.emit('load world', function () {
            // TODO
        });
        */

        // generate the world
        this.tiles = [];
        for (let y = 0; y < 100; y++) {
            let column = [];
            for (let x = 0; x < 100; x++) {
                column.push(0);
            }
            this.tiles.push(column);
        }
    }

    // renders the game world
    render () {
        // only render the tiles that can be seen on the screen
        const yMin = 0;
        const yMax = this.tiles.length;

        const xMin = 0;
        const xMax = this.tiles.length;

        let tileCount = 0;

        // cycle through every tile in the world
        for (let y = yMin; y < yMax; y++) {
            for (let x = xMin; x < xMax; x++) {
                // and render it
                Tile.render(x, y, this.tiles[y][x]);
                tileCount++;
            }
        }

        // TEMP
        /*
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(tileCount.toString(), 50, 50);
        */
    }
}

// initializes the game world
function initWorld () {
    OasisWorld = new World();
}