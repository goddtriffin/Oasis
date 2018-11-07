// sqlite3
const database = require('../database');

// bcrypt
const bcrypt = require('bcryptjs');

// handles logging in a user
function login (username, password) {
    console.log('\nUser Login\n==========');

    // get database instance
    const db = database.getInstance();

    // create container for user login info
    const data = {
        'socket': this,
        db,
        info: {
            username,
            password
        },
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
        loginFailure(data, 'database', 'sqlite3 error');
    }

    // username does exist
    if (data.row) {
        // check if passwords match
        bcrypt.compare(data.info.password, data.row.hash, function(err, res) {
            if (err) {
                loginFailure(data, 'encryption', 'bcrypt error: ' + err);
                return;
            }

            if (res) {
                // passwords match

                // log
                console.log(data.info.username, 'logged in.');

                // tell client
                data.socket.emit('login success', data.row.id, data.row.username);

                // always
                database.close(data.db);
            } else {
                // passwords don't match
                loginFailure(data, 'password', 'wrong password');
                return;
            }
        });
    } else {
        // username doesn't exist
        loginFailure(data, 'username', 'username doesn\'t exist');
    }
}

// handles login failure
function loginFailure (data, errorType, errorMessage) {
    // log
    console.log('login failure:', errorMessage);

    // tell client
    data.socket.emit('login failure', errorType, errorMessage);

    // always
    database.close(data.db);
}

// export
module.exports = {
    login
}