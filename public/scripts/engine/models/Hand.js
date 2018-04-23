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

        // ('left' || 'right')
        this.type = type;

        // true if currently in the punched state
        this.punched = false;

        // how fast the hand is moving on a punch
        this.velocity = 0;

        // hand location offset during a punch
        this.xOffset = 0;
        this.yOffset = 0;
    }

    // update hand data
    // (Player) player
    tick (player) {
        if (this.punched) this.move(player);
        this.setHandLocation(player);
    }

    // handles hand movement during a punch
    move (player) {
        // update xOffset/yOffset
        switch (player.facing) {
            case 'north':
                    this.yOffset -= this.velocity;
                break;

            case 'south':
                    this.yOffset += this.velocity;
                break;
            
            case 'west':
                this.xOffset -= this.velocity;
                break;

            case 'east':
                this.xOffset += this.velocity;
                break;

            case 'north-west':
                this.xOffset -= this.velocity;
                this.yOffset -= this.velocity;
                break;

            case 'north-east':
                this.xOffset += this.velocity;
                this.yOffset -= this.velocity;
                break;

            case 'south-west':
                this.xOffset -= this.velocity;
                this.yOffset += this.velocity;
                break;

            case 'south-east':
                this.xOffset += this.velocity;
                this.yOffset += this.velocity;
                break;

            default:
                console.error('unknown facing direction:', player.facing);
                return;
        }

        // manipulate hand velocity
        this.velocity--;

        // stop the hand movement when done
        if (this.velocity <= -Hand.maxVelocity) {
            this.velocity = 0;
            this.xOffset = 0;
            this.yOffset = 0;

            this.punched = false;
        }
    }

    // sets the hand position based on where the player is, and what hand it is
    setHandLocation (player) {
        // use regular location
        let playerX = player.location.x;
        let playerY = player.location.y;

        // if player has a render location, use that one
        if (player.renderLocation) {
            playerX = player.renderLocation.x;
            playerY = player.renderLocation.y;
        }

        // prep data
        const playerTop = player.location.y;
        const playerBottom = playerTop + player.size.height;
        const playerLeft = player.location.x;
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

                case 'north-west':
                    handX = playerLeft - (this.size.width / 2);
                    handY = playerTop + (player.size.height / 2) - (this.size.height / 2) - (player.size.height * 0.1);
                    break;

                case 'north-east':
                    handX = playerLeft + (player.size.width / 2) - (this.size.width / 2)  + (player.size.width * 0.1);
                    handY = playerTop - (this.size.height / 2);
                    break;

                case 'south-west':
                    handX = playerLeft + (player.size.width / 2) - (this.size.width / 2)  - (player.size.width * 0.1);
                    handY = playerBottom - (this.size.height / 2);
                    break;

                case 'south-east':
                    handX = playerRight - (this.size.width / 2);
                    handY = playerTop + (player.size.height / 2) - (this.size.height / 2)  + (player.size.height * 0.1);
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

                case 'north-west':
                    handX = playerLeft + (player.size.width / 2) - (this.size.width / 2)  - (player.size.width * 0.1);
                    handY = playerTop - (this.size.height / 2);
                    break;

                case 'north-east':
                    handX = playerRight - (this.size.width / 2);
                    handY = playerTop + (player.size.height / 2) - (this.size.height / 2)  - (player.size.height * 0.1);
                    break;

                case 'south-west':
                    handX = playerLeft - (this.size.width / 2);
                    handY = playerTop + (player.size.height / 2) - (this.size.height / 2)  + (player.size.height * 0.1);
                    break;

                case 'south-east':
                    handX = playerLeft + (player.size.width / 2) - (this.size.width / 2)  + (player.size.width * 0.1);
                    handY = playerBottom - (this.size.height / 2);
                    break;
    
                default:
                    console.error('unknown facing direction:', player.facing);
                    return;
            }
        } else {
            console.error('unknown hand type:', this.type);
        }

        // update hand location
        this.location = new Location(handX + this.xOffset, handY + this.yOffset);
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

    // thrusts itself outward
    punch () {
        this.punched = true;

        this.xOffset = 0;
        this.yOffset = 0;

        this.velocity = Hand.maxVelocity;
    }
}

// the fastest the hand should ever move
Hand.maxVelocity = 8;