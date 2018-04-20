// Hand model
// (Player) player , ('left' || 'right') type
class Hand extends Entity {
    constructor (player, type) {
        super(
            player.location,
            new Size(
                player.size.width / 4,
                player.size.height / 4
            )
        );

        this.type = type;
    }

    // update hand data
    // (Player) player
    tick (player) {
        // use regular location
        let playerX = player.location.x;
        let playerY = player.location.y;

        // if player has a render location, use that one
        if (player.renderLocation) {
            playerX = player.renderLocation.x;
            playerY = player.renderLocation.y;
        }

        // prep data
        const playerTop = player.location.y; // - (player.size.height / 2);
        const playerBottom = playerTop + player.size.height;
        const playerLeft = player.location.x; // - (player.size.width / 2);
        const playerRight = playerLeft + player.size.width;

        let handX;
        let handY;

        // manipulate hand location depending on the direction the player is facing
        if (this.type === 'left') {
            switch (player.facing) {
                case 'north':
                    handX = playerLeft + (player.size.width * 0.15);
                    handY = playerTop - (this.size.height / 2);
                    break;
    
                case 'south':
                    handX = playerRight - this.size.width - (player.size.width * 0.15);
                    handY = playerBottom - (this.size.height / 2);
                    break;
                
                case 'west':
                    handX = playerLeft - (this.size.width / 2);
                    handY = playerBottom - (this.size.height) - (player.size.height * 0.15);
                    break;
    
                case 'east':
                    handX = playerRight - (this.size.width / 2);
                    handY = playerTop + (player.size.height * 0.15);
                    break;
    
                default:
                    console.error('unknown facing direction:', player.facing);
                    return;
            }
        } else
        if (this.type === 'right') {
            switch (player.facing) {
                case 'north':
                    handX = playerRight - this.size.width - (player.size.width * 0.15);
                    handY = playerTop - (this.size.height / 2);
                    break;
    
                case 'south':
                    handX = playerLeft + (player.size.width * 0.15);
                    handY = playerBottom - (this.size.height / 2);
                    break;
                
                case 'west':
                    handX = playerLeft - (this.size.width / 2);
                    handY = playerTop + (player.size.height * 0.15);
                    break;
    
                case 'east':
                    handX = playerRight - (this.size.width / 2);
                    handY = playerBottom - this.size.height - (player.size.height * 0.15);
                    break;
    
                default:
                    console.error('unknown facing direction:', player.facing);
                    return;
            }
        } else {
            console.error('unknown hand type:', this.type);
        }

        // update hand location
        this.location = new Location(handX, handY);
    }

    // render the hand to the screen
    // (String) color
    render (color) {
        // render body
        OasisCanvasContext.fillStyle = color;
        OasisCanvasContext.fillRect(
            this.location.x - OasisCamera.location.x,
            this.location.y - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );

        // render outline
        OasisCanvasContext.fillStyle = "black";
        OasisCanvasContext.strokeRect(
            this.location.x - OasisCamera.location.x,
            this.location.y - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );
    }
}