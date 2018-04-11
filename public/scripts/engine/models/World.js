// World model
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
        for (let y = 0; y < 5; y++) {
            let column = [];
            for (let x = 0; x < 5; x++) {
                // column.push((y + x) % 5);
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
                    tilemapY = this.tiles.length - ((-tilemapY) % this.tiles.length) - 1;
                }
                if (worldX < 0) {
                    tilemapX += 1;
                    tilemapX = this.tiles.length - ((-tilemapX) % this.tiles.length) - 1;
                }

                // below/right of world
                if (worldY > this.tiles.length - 1) tilemapY %= (this.tiles.length);
                if (worldX > this.tiles.length - 1) tilemapX %= (this.tiles.length);

                // catch tilemap out-of-bounds errors
                if (tilemapX < 0 || tilemapX > this.tiles.length - 1) console.error('worldY:', worldY, 'tilemapY:', tilemapY);
                if (tilemapX < 0 || tilemapX > this.tiles.length - 1) console.error('worldX:', worldX, 'tilemapX:', tilemapX);

                // and render it
                Tile.render(worldX, worldY, this.tiles[tilemapY][tilemapX], tilemapX, tilemapY);
                tileCount++;
            }
        }

        // TEMP
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(tileCount.toString(), 50, 50);

        // OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.fillText(OasisCamera.location.toString(), 150, 50);
    }
}

// initializes the game world
function initWorld () {
    OasisWorld = new World();
}