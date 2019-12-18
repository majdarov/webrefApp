module.exports = async function(user) {
    // return new Promise((resolve, reject) => {
    
        const sqlite3 = require('sqlite3').verbose();
        
        let db =  new sqlite3.Database('database/dbSQLite.db', (err) => {
            
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to database');
            //  reject db;
        });
    
        let strSQL = `INSERT INTO users(user_name, email, role)
                    VALUES ('${user.user_name}', '${user.email}', '${user.user_role}')`;
        console.log(strSQL);

        db.run(strSQL, function(err) {
            if (err) {
                db.close();
                return console.error(err.message);
            };
            console.log('Added: ' + this.changes);
            if (this.changes === 0) {
                db.close();
                return (false);
            }
        })

        db.close(err => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Disconnect SQLite database');
            // console.log(users);
            return true;
        });
    // })
}