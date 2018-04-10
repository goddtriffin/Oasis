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
        let yMin = Math.floor(OasisCamera.location.y / Tile.size.height);
        let yMax = Math.ceil((OasisCamera.location.y + OasisCanvas.height) / Tile.size.height);

        let xMin = Math.floor(OasisCamera.location.x / Tile.size.width);
        let xMax = Math.ceil((OasisCamera.location.x + OasisCanvas.width) / Tile.size.width);

        let tileCount = 0;  // TEMP

        // boundary setting (FOR NOW)
        if (yMin < 0) yMin = 0;
        if (xMin < 0) xMin = 0;
        if (yMax > this.tiles.length) yMax = this.tiles.length;
        if (xMax > this.tiles.length) xMax = this.tiles.length;

        // cycle through every tile in the world
        for (let y = yMin; y < yMax; y++) {
            for (let x = xMin; x < xMax; x++) {
                // and render it
                Tile.render(x, y, this.tiles[y][x]);
                tileCount++;
            }
        }

        // TEMP
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(tileCount.toString(), 50, 50);

        // OasisCanvasContext.fillStyle = 'black';
        // OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(OasisCamera.location.toString(), 150, 50);
    }
}

// initializes the game world
function initWorld () {
    OasisWorld = new World();
}