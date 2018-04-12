// World model
// (Size) size
class World {
    constructor () {
        // load the actual world tiles from the server
        this.load();
    }

    // loads the game world from the server
    load () {
        socket.emit('send world');
    }

    // renders the game world
    render () {
        // only render the tiles that can be seen on the screen
        let yMin = Math.floor(OasisCamera.location.y / Tile.size.height);
        let yMax = Math.ceil((OasisCamera.location.y + OasisCanvas.height) / Tile.size.height);

        let xMin = Math.floor(OasisCamera.location.x / Tile.size.width);
        let xMax = Math.ceil((OasisCamera.location.x + OasisCanvas.width) / Tile.size.width);

        // track how many tiles are being rendered
        let tileCount = 0;

        // cycle through only the screen-visible tiles
        for (let worldY = yMin; worldY < yMax; worldY++) {
            for (let worldX = xMin; worldX < xMax; worldX++) {
                let tilemapX = worldX;
                let tilemapY = worldY;

                // above/left of world
                if (worldY < 0) {
                    tilemapY += 1;
                    tilemapY = this.tilemap.length - ((-tilemapY) % this.tilemap.length) - 1;
                }
                if (worldX < 0) {
                    tilemapX += 1;
                    tilemapX = this.tilemap.length - ((-tilemapX) % this.tilemap.length) - 1;
                }

                // below/right of world
                if (worldY > this.tilemap.length - 1) tilemapY %= this.tilemap.length;
                if (worldX > this.tilemap.length - 1) tilemapX %= this.tilemap.length;

                // and render it
                Tile.render(worldX, worldY, this.tilemap[tilemapY][tilemapX], tilemapX, tilemapY);
                tileCount++;
            }
        }

        // draw debug info
        if (debug) {
            // draw tiles rendered count
            OasisCanvasContext.fillStyle = 'black';
            OasisCanvasContext.font = "15px Arial";
            OasisCanvasContext.fillText(
                '' + tilecount,
                100,
                100
            );
        }
    }
}

// initializes the game world
function initWorld () {
    OasisWorld = new World();
}