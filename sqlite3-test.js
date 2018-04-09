const sqlite3 = require('sqlite3').verbose();

// handle program usage
if (process.argv.length != 3) {
    console.error('Usage: node sqlite3-test.js <database-name>');
}

// set which database to use
const databasePath = "./db/" + process.argv[2] + ".db";

// open database from local
const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to local database: ' + databasePath);
});

// actual test script
function main () {
    // run in-order:
    db.serialize(function () {
        createUserTable();
    
        // insertTestUsers();
        
        printAllUserData();
    });
    
    // close the database
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
}

// creates the user table
function createUserTable () {
    db.run("CREATE TABLE user (id INTEGER NOT NULL PRIMARY KEY, username INTEGER NOT NULL UNIQUE, hash TEXT NOT NULL, creationDate TEXT NOT NULL)");
}

// inserts test users into the user table
function insertTestUsers () {
    const statement = db.prepare("INSERT into user(username, hash, creationDate) values(?,?,?)");

    for (i=0; i<10; i++) {
        const username = 'user-' + i;
        const hash = 'hash-' + i;
        const date = new Date();
        const creationDate = date.toLocaleTimeString();

        statement.run(username, hash, creationDate);
    }

    statement.finalize();
}

// prints all the data in the user table
function printAllUserData () {
    db.each('SELECT id, username,hash,creationDate FROM user', function (err, row) {
        if (err) {
            console.error(err.message);
        }
        console.log('id|', row.id, 'username|', row.username, 'hash|', row.hash, 'creationDate|', row.creationDate);
    });
}

main();