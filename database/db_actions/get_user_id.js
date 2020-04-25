module.exports = async function (id) {
  return new Promise((resolve, reject) => {
    const sqlite3 = require("sqlite3").verbose();

    let db = new sqlite3.Database("database/dbSQLite.db", (err) => {
      if (err) {
        reject(err.message);
      }
      console.log("Connected to database");
    });

    let user = {};
    /* Get User id from SQLite */
    db.get("SELECT * FROM users WHERE user_id = ?", id, (err, row) => {
      if (err) {
        reject(err.message);
      }
      if (!row) {
        user.ERROR = "ERROR not user with id: " + id;
      } else {
        user.id = row.user_id;
        user.name = row.user_name;
        user.email = row.email;
        user.age = row.age;
        user.role = row.role;
        row.user_photo
          ? (user.photo = row.user_photo)
          : (user.photo = "null.png");
      }
    });
    /******/

    db.close((err) => {
      if (err) {
        reject(err.message);
      }
      console.log("Disconnect SQLite database");
      resolve(user);
    });
  });
};
