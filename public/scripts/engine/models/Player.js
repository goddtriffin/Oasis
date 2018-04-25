// Player model
// (String) username , ({}) stats
class Player extends Entity {
    constructor (username, stats) {
        super(stats.location, stats.size);

        // initialize player stats
        this.username = username;
        this.speed = stats.speed;
        this.color = stats.color;
        this.facing = stats.facing;

        // initialize player body parts
        this.hands = [
            new Hand(this, 'left'),
            new Hand(this, 'right')
        ];

        // true if recently taken damage, false otherwise
        this.hurting = false;
    }

    // update the player's data
    tick () {
        this.move();
        this.updateHands();
    }

    // render the player to the screen
    render () {
        this.renderBody();
        this.renderHands();
        this.renderUsername();
    }

    // handles moving the player
    move () {
        // to be overridden
    }

    // updates the player's hand data
    updateHands () {
        for (let i=0; i<this.hands.length; i++) {
            const boundHandTick = this.hands[i].tick.bind(this.hands[i]);
            boundHandTick(this);
        }
    }

    // thrusts the specified hand outward for punching
    // ('left' || 'right') hand
    punch (hand) {
        this.hands[(hand === 'left')? 0 : 1].punch();
    }

    // flashes the player red to show that they're hurt
    hurt () {
        this.hurting = true;
    }

    // returns the coordinate of which tilemap tile the player is standing on
    // returns {tileX , tileY}
    getTileStandingOnCoordinate () {
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

        // we gucci
        return {tileX, tileY};
    }

    // returns a list of collidable tiles (as rectangles) near the player
    getCollidableTilesNearPlayer () {
        // prep tiles (rectangles) container
        const rectangles = [];

        // get tile coordinate in tilemap of the tile currently being stood on
        const tileStandingOnCoordinate = this.getTileStandingOnCoordinate();

        // check the 9x9 grid surrounding the player
        for (let deltaY = -1; deltaY <= 1; deltaY++) {
            for (let deltaX = -1; deltaX <= 1; deltaX++) {
                // calculate 9x9 grid current tile coordinate
                let tileX = tileStandingOnCoordinate.tileX + deltaX;
                let tileY = tileStandingOnCoordinate.tileY + deltaY;

                // make sure it is within the bounds of the tilemap to
                // correctly calculate the current tile type
                if (tileX < 0) tileX += OasisWorld.tilemap.length;
                if (tileY < 0) tileY += OasisWorld.tilemap.length;

                if (tileX > OasisWorld.tilemap.length - 1) tileX -= OasisWorld.tilemap.length;
                if (tileY > OasisWorld.tilemap.length - 1) tileY -= OasisWorld.tilemap.length;

                // get the current tile type
                const tileType = OasisWorld.tilemap[tileY][tileX];

                // only add rectangle if tile is collidable
                if (Tile.collidable(tileType)) {
                    // get coordinate of tile beneath player
                    tileY = (Math.floor((this.location.y + (this.size.height / 2)) / Tile.size.height) * Tile.size.height) + (deltaY * Tile.size.height);
                    tileX = (Math.floor((this.location.x + (this.size.width / 2)) / Tile.size.width) * Tile.size.width) + (deltaX * Tile.size.width);

                    // create rectangle
                    const rectangle = {
                        location: new Location(tileX, tileY),
                        size: new Size(Tile.size.width, Tile.size.height)
                    }

                    // add to the collection
                    rectangles.push(rectangle);
                }
            }
        }

        return rectangles;
    }

    // renders the player's body
    renderBody () {
        // use regular location
        let x = this.location.x;
        let y = this.location.y;

        // if player has a render location, use that one
        if (this.renderLocation) {
            x = this.renderLocation.x;
            y = this.renderLocation.y;
        }

        // render body
        OasisCanvasContext.fillStyle = (this.hurting)? 'red' : this.color;
        OasisCanvasContext.fillRect(
            x - OasisCamera.location.x,
            y - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );

        // reset hurt status
        if (this.hurting) this.hurting = false;

        // render outline
        OasisCanvasContext.fillStyle = "black";
        OasisCanvasContext.strokeRect(
            x - OasisCamera.location.x,
            y - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );
    }

    // renders the player's hands
    renderHands () {
        for (let i=0; i<this.hands.length; i++) {
            const boundHandRender = this.hands[i].render.bind(this.hands[i]);
            boundHandRender(this.color);
        }
    }

    // renders the player's username
    renderUsername () {
        // use regular location
        let x = this.location.x;
        let y = this.location.y;

        // if player has a render location, use that one
        if (this.renderLocation) {
            x = this.renderLocation.x;
            y = this.renderLocation.y;
        }

        // render username
        OasisCanvasContext.fillStyle = "black";
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(
            this.username,
            x - OasisCamera.location.x,
            y - OasisCamera.location.y - this.size.height + 5
        );
    }
}

// vaiety of human-like colors for player's color
// https://htmlcolorcodes.com/color-names/
Player.colors = [
    'pink', 'orange', 'gold', 'yellow', 'darkkhaki',
    'lavender', 'violet', 'fuschia', 'rebeccapurple', 'indigo', 'slateblue',
    'greenyellow', 'lime', 'springgreen', 'seagreen', 'darkgreen', 'olive', 'darkcyan', 'teal',
    'aqua', 'aquamarine', 'turquoise', 'cadetblue', 'steelblue', 'deepskyblue', 'dodgerblue', 'blue', 'navy',
    'burlywood', 'sandybrown', 'chocolate', 'saddlebrown', 'brown',
    'white', 'silver', 'darkgray', 'gray', 'lighslategray', 'darkslategray', 'black'
]