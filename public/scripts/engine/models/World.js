// container for all trees visible on the screen
// contains [{worldX, worldY} , {worldX, worldY} , ...]
let allVisibleTrees = [];

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

        // reset container for all trees visible on the map
        allVisibleTrees = [];

        // cycle through only the screen-visible tiles
        for (let worldY = yMin - 1; worldY < yMax + 1; worldY++) {
            for (let worldX = xMin - 1; worldX < xMax + 1; worldX++) {
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

                // if tile being rendered is a tree, save it in trees array
                if (this.tilemap[tilemapY][tilemapX] === 5) {
                    const tree = {worldX, worldY};
                    allVisibleTrees.push(tree);
                }
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

// renders all leaves around all the (visible) trees
function renderLeaves () {
    // cycle through all visible trees
    allVisibleTrees.forEach(function (tree) {

        // create 8 leaves blocks around each tree trunk
        for (deltaY = -1; deltaY <= 1; deltaY++) {
            for (deltaX = -1; deltaX <= 1; deltaX++) {
                // don't put a leaf block in the center of the 3x3 grid
                if (deltaY === 0 && deltaX === 0) continue;

                // get tile coordinates
                const tileX = (tree.worldX * Tile.size.width) + (deltaX * Tile.size.width) - OasisCamera.location.x;
                const tileY = (tree.worldY * Tile.size.height) + (deltaY * Tile.size.height) - OasisCamera.location.y;

                // draw tile body
                if (simpleRender) {
                    OasisCanvasContext.fillStyle = Tile.getColor(6);
                    OasisCanvasContext.fillRect(
                        tileX,
                        tileY,
                        Tile.size.width,
                        Tile.size.height
                    );
                } else {
                    OasisCanvasContext.drawImage(
                        OasisAssets[Tile.getType(6)],
                        tileX,
                        tileY,
                        Tile.size.width,
                        Tile.size.height
                    )
                }
            }
        }
    });
}

// initializes the game world
function initWorld () {
    OasisWorld = new World();
}