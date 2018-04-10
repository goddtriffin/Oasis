// Location model
// (double) x , (double) y
class Location {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    // returns a String representation of this model's data
    toString () {
        return "(" + this.x + ", " + this.y + ")";
    }
}