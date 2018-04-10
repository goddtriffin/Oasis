// Player model
// (String) username , ({}) stats
class Player extends Entity {
    constructor (username, stats) {
        super(stats.location, stats.size, stats.speed);

        this.username = username;
        this.color = stats.color;
    }

    // update the player's data
    tick () {
        this.move();
    }

    // render the player to the screen
    render () {
        // render body
        OasisCanvasContext.fillStyle = this.color;
        OasisCanvasContext.fillRect(
            (this.location.x - (this.size.width / 2)) - OasisCamera.location.x,
            (this.location.y - (this.size.height / 2)) - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );

        // render username
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(
            this.username,
            (this.location.x - (this.size.width / 2)) - OasisCamera.location.x,
            (this.location.y - this.size.height) - OasisCamera.location.y
        );

        /*
        // test
        if (this.username === "Dad") {
            OasisCanvasContext.fillStyle = 'black';
            OasisCanvasContext.font = "15px Arial";
            OasisCanvasContext.fillText(
                this.getScreenLocation().toString(),
                100,
                100
            );
        }
        */
    }

    // handles player movement
    move () {
        // to be overridden
    }

    // returns (Location) location of where the player is on the screen (game canvas)
    getScreenLocation () {
        const x = (this.location.x - (this.size.width / 2)) - OasisCamera.location.x;
        const y = (this.location.y - (this.size.height / 2)) - OasisCamera.location.y;

        return new Location(x, y);
    }

    isAboveScreen () {
        // get current screen location and player height
        const screenLocation = this.getScreenLocation();
        const bottom = screenLocation.y + this.size.height;

        // is above the screen
        if (bottom < 0) {
            return true;
        }

        return false;
    }

    isBelowScreen () {
        // get current screen location
        const screenLocation = this.getScreenLocation();
        const top = screenLocation.y;

        // is below the screen
        if (top > OasisCanvas.height) {
            return true;
        }

        return false;
    }

    isLeftOfScreen () {
        // get current screen location and player width
        const screenLocation = this.getScreenLocation();
        const right = screenLocation.x + this.size.width;

        // is left of the screen
        if (right < 0) {
            return true;
        }

        return false;
    }

    isRightOfScreen () {
        // get current screen location
        const screenLocation = this.getScreenLocation();
        const left = screenLocation.x;

        // is above the screen
        if (left > OasisCanvas.width) {
            return true;
        }

        return false;
    }

    // returns true if the player is visibly on the screen (game canvas), false otherwise
    isOnScreen () {
        // is not on screen
        if (this.isAboveScreen() || this.isBelowScreen() || this.isLeftOfScreen() || this.isRightOfScreen()) {
            return false;
        }

        return true;
    }
}