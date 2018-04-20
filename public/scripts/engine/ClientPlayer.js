// ClientPlayer model
// (String) username , ({}) stats
class ClientPlayer extends Player {
    constructor (username, stats) {
        super(username, stats);

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.directionalKeys = [];
    }

    // updates player's data
    tick () {
        super.tick();

        this.updateTileStandingOn();
        this.updateSpeed();
        this.updateDirectionFacing();
    }

    // renders the player's character
    render () {
        super.render();

        if (debug) {
            // draw tile coordinate
            OasisCanvasContext.fillStyle = 'black';
            OasisCanvasContext.font = "15px Arial";
            OasisCanvasContext.fillText(
                this.tileStandingOn,
                200,
                200
            );
        }
    }

    // updates the tile the player is standing on
    updateTileStandingOn () {
        // get coordinate of tile beneath player
        let tileY = Math.floor((this.location.y + (this.size.height / 2)) / Tile.size.height);
        let tileX = Math.floor((this.location.x + (this.size.width / 2)) / Tile.size.width);

        // above/left of world
        if (tileY < 0) {
            tileY += 1;
            tileY = OasisWorld.tilemap.length - ((-tileY) % OasisWorld.tilemap.length) - 1;
        }
        if (tileX < 0) {
            tileX += 1;
            tileX = OasisWorld.tilemap.length - ((-tileX) % OasisWorld.tilemap.length) - 1;
        }

        // below/right of world
        if (tileY > OasisWorld.tilemap.length - 1) tileY %= OasisWorld.tilemap.length;
        if (tileX > OasisWorld.tilemap.length - 1) tileX %= OasisWorld.tilemap.length;

        // test
        if (tileY < 0 || tileY > OasisWorld.tilemap.length) {
            console.error('improper tileY:', tileY);
            return;
        }
        if (tileX < 0 || tileX > OasisWorld.tilemap.length) {
            console.error('improper tileX:', tileX);
            return;
        }

        // set tile standing on
        this.tileStandingOn = OasisWorld.tilemap[tileY][tileX];
    }

    // updates the player's speed, dependent on tile type stood on and direction facing
    updateSpeed () {
        // initially set speed dependent on tile type stood on
        switch (this.tileStandingOn) {
            case 0: // grass
                this.speed = 9;
                break;

            case 1: // sand
                this.speed = 6;
                break;

            case 2: // shore
                this.speed = 3;
                break;

            case 3: // ocean
                this.speed = 1;
                break;
            
            default:
                console.error('unknown tile type stood on:', this.tileStandingOn);
                return;
        }

        // manipulate speed dependent on the direction the player is facing
        // TODO
    }

    // handles player movement
    move () {
        // handle movement
        let updated = false;

        // move up
        if (this.up) {
            this.location.y -= this.speed;
            updated = true;
        }

        // move down
        if (this.down) {
            this.location.y += this.speed;
            updated = true;
        }

        // move left
        if (this.left) {
            this.location.x -= this.speed;
            updated = true;
        }

        // move right
        if (this.right) {
            this.location.x += this.speed;
            updated = true;
        }

        // tell the server if movement updated
        if (updated) {
            // if player has ventured too far from classical tilemap bounds {(0,0) <=> (tilemap.width, tilemap.height)},
            // reset player location to within the classical tilemap bounds
            const tooFarY = (OasisWorld.tilemap.length * Tile.size.height) / 2;
            const tooFarX = (OasisWorld.tilemap.length * Tile.size.width) / 2;

            // too far up/left
            if (this.location.y < -(tooFarY)) this.location.y += (tooFarY * 2);
            if (this.location.x < -(tooFarX)) this.location.x += (tooFarX * 2);

            // too far down/right
            if (this.location.y > tooFarY) this.location.y -= (tooFarY * 2);
            if (this.location.x > tooFarX) this.location.x -= (tooFarX * 2);

            // tell the others
            socket.emit('location update', this.location);
        }
    }

    // updates the direction the player is facing
    updateDirectionFacing () {
        // handle combo directional facing
        if (this.directionalKeys.includes('up') && this.directionalKeys.includes('left')) {
            // facing north-west
            OasisPlayer.face('north-west');
        } else
        if (this.directionalKeys.includes('up') && this.directionalKeys.includes('right')) {
            // facing north-east
            OasisPlayer.face('north-east');
        } else
        if (this.directionalKeys.includes('down') && this.directionalKeys.includes('left')) {
            // facing south-west
            OasisPlayer.face('south-west');
        } else
        if (this.directionalKeys.includes('down') && this.directionalKeys.includes('right')) {
            // facing south-east
            OasisPlayer.face('south-east');
        } else {
            // handle the last 4 facing directions
            if (this.directionalKeys.includes('up')) {
                OasisPlayer.face('north');
            } else
            if (this.directionalKeys.includes('down')) {
                OasisPlayer.face('south');
            } else
            if (this.directionalKeys.includes('left')) {
                OasisPlayer.face('west');
            } else
            if (this.directionalKeys.includes('right')) {
                OasisPlayer.face('east');
            }
        }
    }

    // update the direction the player is facing
    // ('north' || 'south' || 'west' || 'east' || 'north-west' || 'north-east' || 'south-west' || 'south-east') direction
    face (direction) {
        // tell the others
        socket.emit('direction update', direction);

        // update it locally
        this.facing = direction;
    }
}

// initializes this clients player
function initPlayer () {
    // load client player stats
    const username = localStorage.getItem('Oasis-session-username');

    const stats = {};
    stats.location = new Location(0, 0);
    stats.size = new Size(50, 50);
    stats.color = 'red';
    stats.facing = 'north';

    // create this clients player
    OasisPlayer = new ClientPlayer(username, stats);
}