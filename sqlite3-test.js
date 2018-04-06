const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('testdb');

function createUserTable () {
    db.run("CREATE TABLE user (id INT primary key, username INT, password TEXT, creationDate TEXT)");
}

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

function printAllUserData () {
    db.each('SELECT id,username,password,creationDate FROM user', function (err, row) {
        console.log('id:',row.id, 'username:', row.username, ', password:', row.password, ', creationDate:', row.creationDate);
    });
}

db.serialize(function () {
    createUserTable();

    insertTestUsers();
});

printAllUserData();

db.close();

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