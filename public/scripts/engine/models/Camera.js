// Camera model
// (Location) location , (Player | null) playerFollowing
class Camera {
    constructor (location, playerFollowing) {
        this.location = location;

        // only follow player if the one recieved isn't null
        if (playerFollowing) {
            this.playerFollowing = playerFollowing;
        } else {
            this.playerFollowing = null;
        }
    }

    // sets the player for the camera to follow
    followPlayer (playerFollowing) {
        this.playerFollowing = playerFollowing;
    }

    // unsets the player for the camera to follow
    unfollowPlayer () {
        this.playerFollowing = null;
    }

    // update the camera's data
    tick () {
        this.move();
    }

    // handle the camera's movement
    move () {
        // update camera location only if following a player
        if (this.playerFollowing) {
            // center the player in the camera
            this.location.x = this.playerFollowing.location.x - (this.playerFollowing.size.width / 2) - (OasisCanvas.width / 2);
            this.location.y = this.playerFollowing.location.y - (this.playerFollowing.size.height / 2) - (OasisCanvas.height / 2);
        }
    }
}

// initializes the game's camera
function initGameCamera () {
    OasisCamera = new Camera(new Location(0,0), OasisPlayer);
}