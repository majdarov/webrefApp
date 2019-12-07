const sqlite3 = require('sqlite3').verbose();

    let users = [];

    let db = new sqlite3.Database('C:/coding/webrefApp/database/dbSQLite.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to database');
    });

    db.serialize(() => {
        db.each('SELECT name, age FROM users', (err, row) => {
            if (err) {
                console.error(err.message)
            }
            /* let user = {};
            user.name = row.name;
            user.age = row.age;
            user.role = row.role;
            user.photo = row.photo;
            users.push(user); */
            console.log(row.name + ' age->' + row.age);
        });
    });

    db.close(err => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Disconnect SQLite database');
    });