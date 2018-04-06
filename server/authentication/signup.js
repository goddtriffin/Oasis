const database = require('../database');

// handles signing up
// signup = {username, password}
function signup (signup) {
    console.log('\nUser Signup\n===========');

    // get signup time
    const date = new Date();
    signup.creationDate = date.toLocaleTimeString();

    // get database instance
    const db = database.getInstance();

    // create container for user signup info
    const data = {
        'socket': this,
        db,
        signup
    };

    // do in-order:
    db.serialize(() => {
        // get row with username
        database.getRow(db, 'user', 'username', data, addUser, signupFailure);
    });
}

// adds a user
function addUser (data) {
    // username doesn't exist yet
    if (!data.row) {
        data.values = [data.signup.username, data.signup.password, data.signup.creationDate]
        database.insertRow(data.db, 'user', Object.keys(data.signup), data, null, signupFailure);
        // database.printAll(data.db, 'user', ['id', 'username', 'password', 'creationDate']);

        // log
        console.log(data.signup.username, 'signed up.');

        // tell client
        data.socket.emit('signup success', data.signup);

        // always
        database.close(data.db);
    } else {
        // username already exists
        signupFailure(data, 'username taken');
    }
}

// handles signup failure
function signupFailure (data, err) {
    // log
    console.log('signup failure:', err);

    // tell client
    data.socket.emit('signup failure', err);

    // always
    database.close(data.db);
}

// export
module.exports = {
    signup
}