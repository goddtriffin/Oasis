// ClientPlayer model
// (String) username , ({}) stats
class ClientPlayer extends Player {
    constructor (username, stats) {
        super(username, stats);

        // directional movement keys
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        // directional facing keys
        this.directionalKeys = [];

        // health for damage
        this.health = stats.health;
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

        this.renderHealth();

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
                this.speed = 10;
                break;

            case 1: // sand
                this.speed = 8;
                break;

            case 2: // shore
                this.speed = 4;
                break;

            case 3: // ocean
                this.speed = 2;
                break;
            
            default:
                console.error('unknown tile type stood on:', this.tileStandingOn);
                return;
        }

        // manipulate speed dependent on the direction the player is facing
        this.handleDirectionalFacingSpeedEffects();
    }

    // manipulates the player's speed depending on what direction the player is facing
    handleDirectionalFacingSpeedEffects () {
        // denotes which teir of movement impairment to apply
        // (this heigher, the worse off)
        let tier = 0;

        if (this.up && this.left) {
            // moving north-west
            if (this.facing === 'west'          || this.facing === 'north')         tier = 1;
            if (this.facing === 'south-west'    || this.facing === 'north-east')    tier = 2;
            if (this.facing === 'south'         || this.facing === 'east')          tier = 3;
            if (this.facing === 'south-east')                                       tier = 4;
        } else
        if (this.up && this.right) {
            // moving north-east
            if (this.facing === 'north'         || this.facing === 'east')          tier = 1;
            if (this.facing === 'north-west'    || this.facing === 'south-east')    tier = 2;
            if (this.facing === 'west'          || this.facing === 'south')         tier = 3;
            if (this.facing === 'south-west')                                       tier = 4;
        } else
        if (this.down && this.left) {
            // moving south-west
            if (this.facing === 'south'         || this.facing === 'west')          tier = 1;
            if (this.facing === 'south-east'    || this.facing === 'north-west')    tier = 2;
            if (this.facing === 'north'         || this.facing === 'east')          tier = 3;
            if (this.facing === 'north-east')                                       tier = 4;
        } else
        if (this.down && this.right) {
            // moving south-east
            if (this.facing === 'east'          || this.facing === 'south')         tier = 1;
            if (this.facing === 'north-east'    || this.facing === 'south-west')    tier = 2;
            if (this.facing === 'north'         || this.facing === 'west')          tier = 3;
            if (this.facing === 'north-west')                                       tier = 4;
        } else {
            if (this.up) {
                // moving north
                if (this.facing === 'north-west'    || this.facing === 'north-east')    tier = 1;
                if (this.facing === 'west'          || this.facing === 'east')          tier = 2;
                if (this.facing === 'south-west'    || this.facing === 'south-east')    tier = 3;
                if (this.facing === 'south')                                            tier = 4;
            } else
            if (this.down) {
                // moving south
                if (this.facing === 'south-west'    || this.facing === 'south-east')    tier = 1;
                if (this.facing === 'west'          || this.facing === 'east')          tier = 2;
                if (this.facing === 'north-west'    || this.facing === 'north-east')    tier = 3;
                if (this.facing === 'north')                                            tier = 4;
            } else
            if (this.left) {
                // moving west
                if (this.facing === 'south-west'    || this.facing === 'north-west')    tier = 1;
                if (this.facing === 'south'         || this.facing === 'north')         tier = 2;
                if (this.facing === 'south-east'    || this.facing === 'north-east')    tier = 3;
                if (this.facing === 'east')                                             tier = 4;
            } else
            if (this.right) {
                // moving east
                if (this.facing === 'north-east'    || this.facing === 'south-east')    tier = 1;
                if (this.facing === 'north'         || this.facing === 'south')         tier = 2;
                if (this.facing === 'north-west'    || this.facing === 'south-west')    tier = 3;
                if (this.facing === 'west')                                             tier = 4;
            }
        }

        // manipulate the player's speed
        this.speed -= tier;

        if (this.speed <= 0) {
            this.speed = 0.5;
        }
    }

    // handles player movement
    move () {
        // handle movement
        let updated = false;

        // move up
        if (this.up) {
            for (let i=0; i<this.speed; i++) {
                this.location.y -= 1;
                updated = true;
            }
        }

        // move down
        if (this.down) {
            for (let i=0; i<this.speed; i++) {
                this.location.y += 1;
                updated = true;
            }
        }

        // move left
        if (this.left) {
            for (let i=0; i<this.speed; i++) {
                this.location.x -= 1;
                updated = true;
            }
        }

        // move right
        if (this.right) {
            for (let i=0; i<this.speed; i++) {
                this.location.x += 1;
                updated = true;
            }
        }

        // tell the server if movement updated
        if (updated) {
            // lock face direction with movement direction if no directional keys are currently being pressed
            if (this.directionalKeys.length === 0) this.lockMoveDirectionAndFaceDirection();

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

    // sets face direction to movement direction
    lockMoveDirectionAndFaceDirection () {
        if (this.up && this.left) {
            this.face('north-west');
        } else
        if (this.up && this.right) {
            this.face('north-east');
        } else
        if (this.down && this.left) {
            this.face('south-west');
        } else
        if (this.down && this.right) {
            this.face('south-east');
        } else {
            if (this.up) {
                this.face('north');
            } else
            if (this.down) {
                this.face('south');
            } else
            if (this.left) {
                this.face('west');
            } else
            if (this.right) {
                this.face('east');
            }
        }
    }

    // updates the direction the player is facing
    updateDirectionFacing () {
        // handle combo directional facing
        if (this.directionalKeys.includes('up') && this.directionalKeys.includes('left')) {
            // facing north-west
            this.face('north-west');
        } else
        if (this.directionalKeys.includes('up') && this.directionalKeys.includes('right')) {
            // facing north-east
            this.face('north-east');
        } else
        if (this.directionalKeys.includes('down') && this.directionalKeys.includes('left')) {
            // facing south-west
            this.face('south-west');
        } else
        if (this.directionalKeys.includes('down') && this.directionalKeys.includes('right')) {
            // facing south-east
            this.face('south-east');
        } else {
            // handle the last 4 facing directions
            if (this.directionalKeys.includes('up')) {
                this.face('north');
            } else
            if (this.directionalKeys.includes('down')) {
                this.face('south');
            } else
            if (this.directionalKeys.includes('left')) {
                this.face('west');
            } else
            if (this.directionalKeys.includes('right')) {
                this.face('east');
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

    // update all connected players with punch event
    // ('left' || 'right') hand
    punch (hand) {
        super.punch(hand);

        // tell everyone
        socket.emit('punch', hand);
    }

    // renders the player's current health
    renderHealth () {
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "30px Arial";
        OasisCanvasContext.fillText(
            '' + OasisPlayer.health + ' / 100',
            50,
            50
        );
    }
}

// initializes this clients player
function initPlayer () {
    // load client player stats
    const username = localStorage.getItem('Oasis-session-username');

    const stats = {};
    stats.location = new Location(0, 0);
    stats.size = new Size(45, 45);
    stats.color = Player.colors[getRandInt(0, 10)];
    stats.facing = 'north';
    stats.health = 100;

    // create this clients player
    OasisPlayer = new ClientPlayer(username, stats);
}