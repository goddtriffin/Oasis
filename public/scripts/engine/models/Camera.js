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
        move();
    }

    // handle the camera's movement
    move () {
        // update camera location only if following a player
        if (this.playerFollowing) {
            // TODO
        }
    }
}