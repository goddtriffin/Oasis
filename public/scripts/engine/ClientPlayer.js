// ClientPlayer model
// (String) username , ({}) stats
class ClientPlayer extends Player {
    constructor (username, stats) {
        super(username, stats);

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    // handles player movement
    move () {
        // handle movement
        let updated = false;

        if (this.up) {
            this.location.y -= this.speed;
            updated = true;
        }

        if (this.down) {
            this.location.y += this.speed;
            updated = true;
        }

        if (this.left) {
            this.location.x -= this.speed;
            updated = true;
        }

        if (this.right) {
            this.location.x += this.speed;
            updated = true;
        }

        // tell the server if movement updated
        if (updated) {
            socket.emit('location update', this.username, this.location);
        }
    }
}