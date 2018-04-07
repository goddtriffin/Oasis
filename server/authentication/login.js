const database = require('../database');

// handles logging in a user
function login (login) {
    console.log('\nUser Login\n==========');

    // get database instance
    const db = database.getInstance();

    // create container for user login info
    const data = {
        'socket': this,
        db,
        info: login,
        err: false
    };

    // do in-order:
    db.serialize(() => {
        // get row with username
        database.getRow(db, 'user', 'username', data, authenticateUser, loginFailure);
    });
}

function authenticateUser (data) {
    // catch error from last step
    if (data.err) {
        loginFailure(data, 'sqlite3 error');
    }

    // username does exist
    if (data.row) {
        // check if passwords match
        if (data.info.password !== data.row.password) {
            // passwords don't match
            loginFailure(data, 'wrong password');
            return;
        }

        // passwords match

        // log
        console.log(data.info.username, 'logged in.');

        // tell client
        data.socket.emit('login success', data.info);

        // always
        database.close(data.db);
    } else {
        // username doesn't exist
        loginFailure(data, 'user doesn\'t exist');
    }
}

// handles login failure
function loginFailure (data, err) {
    // log
    console.log('login failure:', err);

    // tell client
    data.socket.emit('login failure', err);

    // always
    database.close(data.db);
}

// export
module.exports = {
    login
}