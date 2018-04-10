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
            (this.location.x - (this.size.width / 2)) + OasisCamera.location.x, 
            (this.location.y - (this.size.height / 2)) + OasisCamera.location.y, 
            this.size.width, 
            this.size.height
        );

        // render username
        OasisCanvasContext.fillStyle = 'black';
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(this.username, this.location.x - (this.size.width / 2), this.location.y - this.size.height);
    }

    // handles player movement
    move () {
        // to be overridden
    }
}