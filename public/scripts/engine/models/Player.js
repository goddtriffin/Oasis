// Player model
// (String) username , ({}) stats
class Player extends Entity {
    constructor (username, stats) {
        console.log(stats);
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