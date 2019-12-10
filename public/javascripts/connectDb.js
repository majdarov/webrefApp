const sqlite3 = require('sqlite3').verbose();

function dbInit() { // Initiate Db
    
   let db = new sqlite3.Database('database/dbSQLite.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to database');
        return db;
    });
}

function getUsers(strSQL) {
    
    // dbInit();
    let db = new sqlite3.Database('database/dbSQLite.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to database');
        // return db;
    });

    let users = [];
    
    db.each(strSQL,(err, row) => {
       
        if (err) {
            return console.error(err.message)
        }

        let user = {};
        user.id = row.user_id;
        user.name = row.user_name;
        user.age = row.age;
        user.role = row.role;
        row.user_photo ? user.photo = row.user_photo : user.photo = 'no photo';
        row.photo ? user.photoB = row.photo.toString('base64') : user.photoB = 'no photo';
        users.push(user);
    });

    closeDb(db);
    return users;
}

function closeDb(db) {
    db.close(err => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Disconnect SQLite database');
        // console.log(users);
    });
}

strSQL = 'SELECT * FROM users';

//users = dbInit();

module.exports.getUsers = getUsers(strSQL);
module.exports.dbInit = dbInit;
module.exports.closeDb = closeDb;