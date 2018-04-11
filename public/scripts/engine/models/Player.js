// Player model
// (String) username , ({}) stats
class Player extends Entity {
    constructor (username, stats) {
        super(stats.location, stats.size);

        this.username = username;
        this.speed = stats.speed;
        this.color = stats.color;
    }

    // update the player's data
    tick () {
        this.move();
    }

    // render the player to the screen
    render () {
        // render body
        this.renderBody();

        // render username
        this.renderUsername();
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
        OasisCanvasContext.fillStyle = this.color;
        OasisCanvasContext.fillRect(
            x - OasisCamera.location.x,
            y - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );
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
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(
            this.username,
            x - OasisCamera.location.x,
            y - OasisCamera.location.y - this.size.height + 5
        );
    }

    // handles player movement
    move () {
        // to be overridden
    }
}