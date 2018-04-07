// sqlite3
const database = require('../database');

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// login
const login = require('./login').login;

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

    // make sure password and repassword match
    if (data.info.password !== data.info.repassword) {
        signupFailure(data, 'passwords don\'t match');
        return;
    }

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
        bcrypt.hash(data.info.password, saltRounds, function(err, hash) {
            // handle bcrypt error
            if (err) {
                signupFailure(data, 'bcrypt error: ' + err);
                return;
            }

            // set signup password as hash
            data.info.hash = hash;

            // attempt inserting user into the database
            data.values = [data.info.username, data.info.hash, data.info.creationDate]
            database.insertRow(data.db, 'user', ['username', 'hash', 'creationDate'], data, signupSuccess, signupFailure);
        });
    } else {
        // username already exists
        signupFailure(data, 'username taken');
    }
}

// handles signup success
function signupSuccess (data) {
    // catch error from last step
    if (data.err) {
        signupFailure(data, 'sqlite3 error');
    }

    // log
    console.log(data.info.username, 'signed up.');

    // tell client
    data.socket.emit('signup success', null);

    // always
    database.close(data.db);

    // since successfully signed up, login
    // has to bind to socket (make 'this' refer to socket) because login sets its 'data.socket' var equal to 'this'
    const socketBindLogin = login.bind(data.socket);
    socketBindLogin({username: data.info.username, password: data.info.password});
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