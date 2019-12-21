module.exports =  async function(_options) {
    
    const sqlite3 = require('sqlite3').verbose();
    let users = [];

    let db = new sqlite3.Database('database/dbSQLite.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to database');
    });

    db.each('SELECT * FROM users', (err, row) => {
        if (err) {
            console.error(err.message);
        }
        let user = {};
        user.id = row.user_id;
        user.name = row.user_name;
        user.email = row.email;
        user.age = row.age;
        user.role = row.role;
        row.user_photo ? user.photo = row.user_photo : user.photo = 'no photo';
        row.photo ? user.photoB = row.photo.toString('base64') : user.photoB = 'no photo';
        users.push(user);
        _options.users = users;
    });

    db.close(err => {
        if (err) {
            console.error(err.message);
        }
        console.log('Disconnect SQLite database');   
        
    });  
    return Promise.resolve();
}
