module.exports =  async function(options) {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();
        
        let db = new sqlite3.Database('database/dbSQLite.db', (err) => {
            if (err) {
                reject(err.message);
            }
            console.log('Connected to database');
        });
        
        options.users = [];
        /* Get Users from SQLite */
        db.each('SELECT * FROM users', (err, row) => {
            if (err) {
                reject(err.message);
            }
            let user = {};
            user.id = row.user_id;
            user.name = row.user_name;
            user.email = row.email;
            user.age = row.age;
            user.role = row.role;
            row.user_photo ? user.photo = row.user_photo : user.photo = "null.png";
            row.photo ? user.photoB = row.photo.toString('base64') : user.photoB = "null.png";
            
            options.users.push(user);
        });
        /******/

        db.close(err => {
            if (err) {
                reject(err.message);
            }
            console.log('Disconnect SQLite database');
            resolve();
        });  
    });
}
