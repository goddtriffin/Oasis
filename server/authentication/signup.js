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
        info: signup,
        err: false
    };

    // do in-order:
    db.serialize(() => {
        // get row with username
        database.getRow(db, 'user', 'username', data, createUser, signupFailure);
    });
}

// adds a user
function createUser (data) {
    // catch error from last step
    if (data.err) {
        signupFailure(data, 'sqlite3 error');
        return;
    }

    // username doesn't exist yet
    if (!data.row) {
        data.values = [data.info.username, data.info.password, data.info.creationDate]
        database.insertRow(data.db, 'user', Object.keys(data.info), data, null, signupFailure);

        // catch error from last step
        if (data.err) {
            signupFailure(data, 'sqlite3 error');
        }

        // log
        console.log(data.info.username, 'signed up.');

        // tell client
        data.socket.emit('signup success', data.info);

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