// Tile model
// 
class Tile {
    // renders a tile
    // (int) worldX , (int) worldY , (int) tileType
    static render (worldX, worldY, tileType) {
        // get tile coordinates
        const tileX = (worldX * Tile.size.width) - OasisCamera.location.x;
        const tileY = (worldY * Tile.size.height) - OasisCamera.location.y;

        // draw tile body
        OasisCanvasContext.fillStyle = Tile.getColor(tileType);
        OasisCanvasContext.fillRect(tileX, tileY, Tile.size.width, Tile.size.height);

        // draw tile outline
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.strokeRect(tileX, tileY, Tile.size.width, Tile.size.height);
    }

    // returns a tile color from a tile type
    // (int) tileType
    static getColor (tileType) {
        switch (tileType) {
            case 0:
                return 'green';
            
            default:
                console.error('unknown tileType:', tileType);
                return 'black';
        }
    }
}

// set static Tile size
Tile.size = new Size(100, 100);