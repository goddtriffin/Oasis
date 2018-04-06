const sqlite3 = require('sqlite3').verbose();

const db_p = "./db/production";
const db_t = "./db/test";

// handle program usage
if (process.argv.length != 3) {
    console.error('Usage: node sqlite3-test.js -p|t');
}

// set which database to use
const which = (process.argv[2] === '-t')? db_t : db_p;

// open database from local
const db = new sqlite3.Database(which, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to local database: ' + which);
});

// actual test script
function main () {
    // run in-order:
    db.serialize(function () {
        // createUserTable();
    
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
    db.run("CREATE TABLE user (id INT primary key, username INT, password TEXT, creationDate TEXT)");
}

// inserts test users into the user table
function insertTestUsers () {
    const statement = db.prepare("INSERT into user(username, password, creationDate) values(?,?,?)");

    for (i=0; i<10; i++) {
        const username = 'user-' + i;
        const password = 'password-' + i;
        const date = new Date();
        const creationDate = date.toLocaleTimeString();

        statement.run(username, password, creationDate);
    }

    statement.finalize();
}

// prints all the data in the user table
function printAllUserData () {
    db.each('SELECT id,username,password,creationDate FROM user', function (err, row) {
        if (err) {
            console.error(err.message);
        }
        console.log('id:',row.id, 'username:', row.username, ', password:', row.password, ', creationDate:', row.creationDate);
    });
}

main();

//
//      EXAMPLE
/*
db.serialize(function () {
    db.run("CREATE TABLE user (id INT primary key, username INT, password TEXT, creationDate TEXT)");

    const statement = db.prepare("INSERT into user(username, password, creationDate) values(?,?,?)");

    for (i=0; i<10; i++) {
        const username = 'user-' + i;
        const password = 'password-' + i;
        const date = new Date();
        const creationDate = date.toLocaleTimeString();

        statement.run(username, password, creationDate);
    }

    statement.finalize();

    printAllUserData();

    db.close();
});
*/