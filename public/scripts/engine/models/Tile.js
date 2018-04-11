// Tile model
class Tile {
    // renders a tile
    // (int) worldX , (int) worldY , (int) tileType
    static render (worldX, worldY, tileType, tilemapX, tilemapY) {
        // get tile coordinates
        const tileX = (worldX * Tile.size.width) - OasisCamera.location.x;
        const tileY = (worldY * Tile.size.height) - OasisCamera.location.y;

        // draw tile body
        OasisCanvasContext.fillStyle = Tile.getColor(tileType);
        OasisCanvasContext.fillRect(tileX, tileY, Tile.size.width, Tile.size.height);

        // draw tile outline
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.strokeRect(tileX, tileY, Tile.size.width, Tile.size.height);

        // draw tile coordinate
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText('(' + worldX + ', ' + worldY + ')', tileX + (Tile.size.width / 2) - 10, tileY + (Tile.size.height / 2));

        // draw tilemap coordinate
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText('(' + tilemapX + ', ' + tilemapY + ')', tileX + (Tile.size.width / 2) - 10, tileY + (Tile.size.height / 2) + 15);
    }

    // returns a tile color from a tile type
    // (int) tileType
    static getColor (tileType) {
        switch (tileType) {
            case 0:
                return 'green';
            
            case 1:
                return 'red';

            case 2:
                return 'blue';

            case 3:
                return 'yellow';
            
            case 4:
                return 'purple';
            
            default:
                console.error('unknown tileType:', tileType);
                return 'black';
        }
    }
}

// set static Tile size
Tile.size = new Size(100, 100);