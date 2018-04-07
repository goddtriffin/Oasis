// initialize sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = "./db/production.db";

//
//      Database Handlers
//

// returns database instance
function getInstance () {
    // open database from local file
    const database = new sqlite3.Database(db, (err) => {
        if (err) {
            // failure
            console.error(err.message);
        } else {
            // success
            console.log('Connected to local database: ' + db);
        }
    });

    return database;
}

// closes the database
// database = getInstance()
function close (database) {
    // close the database
    database.close((err) => {
        if (err) {
            // failure
            console.error(err.message);
        } else {
            // success
            console.log('Closed the database connection.');
        }
    });
}

//
//      Row Handlers
//

// inserts single row
// db = getInstance() ; table = String
// vars = [String] ; data = {}
function insertRow (db, table, vars, data, successCallback, failureCallback) {
    // initialize statement
    let statement = "INSERT";

    // set table
    statement += " INTO " + table

    // set vars
    statement += " (";
    statement += getPreppedListString(vars);
    statement += ")";

    // set values
    statement += " VALUES (";
    statement += getPlaceholderVariableString(data.values.length);
    statement += ")";

    // log event
    console.log('insertRow:', statement);

    // insert
    db.run(statement, data.values, (err) => {
        if (err) {
            // failure
            data.err = true;
            console.error(err.message);
            if (failureCallback) failureCallback(data, err);
        } else {
            // success
            if (successCallback) successCallback(data);
        }
    });
}

// returns specific role, null otherwise
// db = getInstance() ; table = String
// whereVar = String ; data = {}
// successCallback = callback ; failureCallback = callback
function getRow (db, table, whereVar, data, successCallback, failureCallback) {
    // initialize statement
    let statement = "SELECT *";

    // set table
    statement += " FROM " + table;

    // set where
    statement += " WHERE " + whereVar + " = ?";

    // log event
    console.log('getRow:', statement);

    // get
    db.get(statement, [data.info[whereVar]], (err, row) => {
        if (err) {
            // failure
            data.err = true;
            console.error(err.message);
            if (failureCallback) failureCallback(data, err);
        } else {
            // success
            data.row = row;
            if (successCallback) successCallback(data);
        }
    });
}

// prints all data from gievn columns in given table
// db = getInstance() ; table = String ; columns = [String]
function printAll (db, table, columns) {
    // initialize statement
    let statement = "SELECT ";

    // set columns
    statement += getPreppedListString(columns);

    // set table
    statement += " FROM " + table;

    // log event
    console.log('printall:', statement);

    // print each row
    db.each(statement, function (err, row) {
        if (err) {
            console.error(err.message);
        } else {
            // create row to print
            let line = "";
            columns.forEach((column) => {
                line += column + "|" + row[column] + " ";
            })

            // print
            console.log(line);
        }
    });
}

//
//      Utilities
//

// returns list of items as string prepped for a sqlite3 statement
// list = [String]
function getPreppedListString (list) {
    // initialize
    let preppedListString = "";

    // convert [item, item, ..., item] to 'item,item,...,item'
    for (i=0; i<list.length-1; i++) {
        preppedListString += list[i] + ",";
    }
    preppedListString += list[list.length-1];

    // done
    return preppedListString;
}

// returns: '?,?,...,?'
// length = Integer
function getPlaceholderVariableString (length) {
    // initialize
    let placeholderVariableString = "";

    // create string of '?'s
    for (i=0; i<length-1; i++) {
        placeholderVariableString += "?,";
    }
    placeholderVariableString += "?";

    // done
    return placeholderVariableString;
}

// export
module.exports = {
    // database
    getInstance,
    close,

    // row
    insertRow,
    getRow,
    printAll
}