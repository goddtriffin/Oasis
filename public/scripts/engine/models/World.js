// World model
// (Size) size
class World {
    constructor (size) {
        this.size = size;

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
        for (let y = 0; y < this.size.height; y++) {
            let column = [];
            for (let x = 0; x < this.size.width; x++) {
                // column.push((y + x) % this.size.width);
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
                    tilemapY = this.size.height - ((-tilemapY) % this.size.height) - 1;
                }
                if (worldX < 0) {
                    tilemapX += 1;
                    tilemapX = this.size.width - ((-tilemapX) % this.size.width) - 1;
                }

                // below/right of world
                if (worldY > this.size.height - 1) tilemapY %= (this.size.height);
                if (worldX > this.size.width - 1) tilemapX %= (this.size.width);

                // catch tilemap out-of-bounds errors
                if (tilemapY < 0 || tilemapY > this.size.height - 1) console.error('worldY:', worldY, 'tilemapY:', tilemapY);
                if (tilemapX < 0 || tilemapX > this.size.width - 1) console.error('worldX:', worldX, 'tilemapX:', tilemapX);

                // and render it
                Tile.render(worldX, worldY, this.tiles[tilemapY][tilemapX], tilemapX, tilemapY);
                tileCount++;
            }
        }

        // TEMP
        /*
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(tileCount.toString(), 50, 50);

        // OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.fillText(OasisCamera.location.toString(), 150, 50);
        */
    }
}

// initializes the game world
function initWorld () {
    OasisWorld = new World(new Size(20, 20));
}