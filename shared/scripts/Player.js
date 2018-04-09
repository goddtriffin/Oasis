class Player {
    constructor (username) {
        this.username = username;

        this.coordinate = {x: 0.0, y: 0.0};
        this.size = 30;
        this.speed = 5;

        this.color = 'Red';

        this.up = false;
        this.down = true;
        this.left = false;
        this.right = true;
    }

    // update the player's data
    tick () {
        this.move();
    }

    // render the player to the screen
    render () {
        OasisCanvasContext.fillStyle = this.color;
        OasisCanvasContext.fillRect(this.coordinate.x - (this.size / 2), this.coordinate.y - (this.size / 2), this.size, this.size);
    }

    // if directional keys are tirggered, move in that direction
    move () {
        if (this.up) {
            this.coordinate.y -= this.speed;
        }

        if (this.down) {
            this.coordinate.y += this.speed;
        }

        if (this.left) {
            this.coordinate.x -= this.speed;
        }

        if (this.right) {
            this.coordinate.x += this.speed;
        }
    }
}