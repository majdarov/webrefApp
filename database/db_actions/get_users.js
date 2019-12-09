module.exports = function() {
    
    const sqlite3 = require('sqlite3').verbose();
    
    // let db =  new sqlite3.Database('C:\\coding\\webrefApp\\database\\dbSQLite.db', (err) => {
    let db =  new sqlite3.Database('database/dbSQLite.db', (err) => {
        
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to database');
        // return db;
    });

    let users = [];
    
   db.serialize(() => {
        db.each('SELECT * FROM users', (err, row) => {
            if (err) {
                return console.error(err.message);
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
    })

    db.close(err => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Disconnect SQLite database');
        // console.log(users);
    });
    console.log('users.lenght: ' + users.length);
    return users;

}