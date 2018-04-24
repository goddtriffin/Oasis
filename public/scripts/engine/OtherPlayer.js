// OtherPlayer model
// (String) username , ({}) stats
class OtherPlayer extends Player {
    constructor (username, stats) {
        super(username, stats);

        // initially set render location to real location
        this.renderLocation = stats.location;

        // set initial kill count
        this.killCount = stats.killCount;
    }

    tick () {
        this.updateRenderLocation();
        this.updateHands();
    }

    // renders the OtherPlayer
    render () {
        // if off the screen, visually represent the OtherPlayer as a line on the closest wall
        if (this.isOnScreen()) {
            // is on screen

            this.renderBody();
            this.renderHands();
            this.renderUsername();
        } else {
            // not on screen
            this.renderLocationGhost();
        }
    }

    // renders the ghost of the OtherPlayer (line(s) on the game screens walls),
    // instead of the OtherPlayer's body ONLY if can't be seen on the game screen inherently
    renderLocationGhost () {
        OasisCanvasContext.fillStyle = this.color;
        const lineThickness = 5;

        // prepare coordinates
        const screenLocation = this.getScreenLocation();
        let x = screenLocation.x + (this.size.width / 2);
        let y = screenLocation.y + (this.size.height / 2);

        // make sure x is within the bounds of the screen
        if (x < 0) x = 0;
        if (x + this.size.width > OasisCanvas.width) x = OasisCanvas.width - this.size.width;

        // make sure y is within the bounds of the screen
        if (y < 0) y = 0;
        if (y + this.size.height > OasisCanvas.height) y = OasisCanvas.height - this.size.height;

        // above
        if (this.isAboveScreen()) {
            OasisCanvasContext.fillRect(x, 0, this.size.width, lineThickness);
        }

        // below
        if (this.isBelowScreen()) {
            OasisCanvasContext.fillRect(x, OasisCanvas.height - lineThickness, this.size.width, lineThickness);
        }

        // left
        if (this.isLeftOfScreen()) {
            OasisCanvasContext.fillRect(0, y, lineThickness, this.size.height);
        }

        // right
        if (this.isRightOfScreen()) {
            OasisCanvasContext.fillRect(OasisCanvas.width - lineThickness, y, lineThickness, this.size.height);
        }
    }

    /*
    // handles player movement
    move () {
        // TODO (potentially): interpolation
    }
    */
}

// updates all the other players
function tickOtherPlayers () {
    Object.keys(OasisPlayers).forEach(function (socketID) {
        OasisPlayers[socketID].tick();
    });
}

// renders all the other players
function renderOtherPlayers () {
    Object.keys(OasisPlayers).forEach(function (socketID) {
        OasisPlayers[socketID].render();
    });
}