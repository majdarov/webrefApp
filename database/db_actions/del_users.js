module.exports = async function(user_id) {
    
    const sqlite3 = require('sqlite3').verbose();
    
    let db =  new sqlite3.Database('database/dbSQLite.db', (err) => {
        
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to database');
        // return db;
    });

    db.run('DELETE FROM users WHERE user_id=?', user_id, function(err) {
        if (err) {
            db.close();
            return false;
        };
        console.log('Deleted row`s: ' + this.changes);
        if (this.changes === 0) {
            db.close();
            return false;
        }
    })

    db.close(err => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Disconnect SQLite database');
        // console.log(users);
        
    });
    return true;
}