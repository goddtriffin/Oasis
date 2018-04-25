// Tile model
class Tile {
    // renders a tile
    // (int) worldX , (int) worldY , (int) tileType
    static render (worldX, worldY, tileType, tilemapX, tilemapY) {
        // get tile coordinates
        const tileX = (worldX * Tile.size.width) - OasisCamera.location.x;
        const tileY = (worldY * Tile.size.height) - OasisCamera.location.y;

        // draw tile body
        if (simpleRender) {
            OasisCanvasContext.fillStyle = Tile.getColor(tileType);
            OasisCanvasContext.fillRect(
                tileX,
                tileY,
                Tile.size.width,
                Tile.size.height
            );
        } else {
            OasisCanvasContext.drawImage(
                OasisAssets[this.getType(tileType)],
                tileX,
                tileY,
                Tile.size.width,
                Tile.size.height
            )
        }

        // draw debug info
        if (debug) {
            // draw tile outline
            OasisCanvasContext.fillStyle = 'black';
            OasisCanvasContext.strokeRect(
                tileX,
                tileY,
                Tile.size.width,
                Tile.size.height
            );

            // draw tile coordinate
            OasisCanvasContext.fillStyle = 'black';
            OasisCanvasContext.font = "15px Arial";
            OasisCanvasContext.fillText(
                '(' + worldX + ', ' + worldY + ')',
                tileX + (Tile.size.width / 2) - 10,
                tileY + (Tile.size.height / 2)
            );

            // draw tilemap coordinate
            OasisCanvasContext.fillStyle = 'black';
            OasisCanvasContext.font = "15px Arial";
            OasisCanvasContext.fillText(
                '(' + tilemapX + ', ' + tilemapY + ')',
                tileX + (Tile.size.width / 2) - 10,
                tileY + (Tile.size.height / 2) + 15
            );
        }
    }

    // returns a tile color from a tile type
    // (int) tileType
    static getColor (tileType) {
        switch (tileType) {
            case 0: // grass
                return 'limegreen';
            
            case 1: // sand
                return 'khaki';

            case 2: // shore
                return 'aquamarine';

            case 3: // ocean
                return 'dodgerblue';

            case 4: // stone
                return 'slategrey';

            case 5: // tree
                return 'saddlebrown';

            case 6: // leaves
                return 'green';
            
            default:
                console.error('unknown tileType:', tileType);
                return 'black';
        }
    }

    // returns a tile type as string from a tile type number
    // (int) tileType
    static getType (tileType) {
        switch (tileType) {
            case 0: // grass
                return 'grass';
            
            case 1: // sand
                return 'sand';

            case 2: // shore
                return 'shore';

            case 3: // ocean
                return 'ocean';

            case 4: // stone
                return 'stone';

            case 5: // tree
                return 'tree';

            case 6: // leaves
                return 'leaves';
            
            default:
                console.error('unknown tileType:', tileType);
                return 'unknown';
        }
    }

    // returns true if tile is collidable
    // (int) tileType
    static collidable (tileType) {
        switch (tileType) {
            case 4: // stone
                return true;
            
            case 5: // tree
                return true;
            
            default: // everything else
                return false
        }
    }
}

// set static Tile size
Tile.size = new Size(85, 85);