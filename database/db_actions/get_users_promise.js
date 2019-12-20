module.exports =  async function(_options) {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();
        // var options = require('../public/javascripts/options.json')
        _options.users = [];

        let db = new sqlite3.Database('database/dbSQLite.db', (err) => {
            if (err) {
                reject(err.message);
            }
            console.log('Connected to database');
        });

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
            row.user_photo ? user.photo = row.user_photo : user.photo = 'no photo';
            row.photo ? user.photoB = row.photo.toString('base64') : user.photoB = 'no photo';
            
            _options.users.push(user);
        });

        db.close(err => {
            if (err) {
                reject(err.message);
            }
            console.log('Disconnect SQLite database');
            // console.log('users.length: ' + _options.users.length);
            resolve();
        });  
    })
}