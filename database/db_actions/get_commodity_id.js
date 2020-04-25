module.exports = async function (id) {
  return new Promise((resolve, reject) => {
    const sqlite3 = require("sqlite3").verbose();

    /* Get Commodity from tabletposDB */
    let db = new sqlite3.Database("database/tabletposDB", (err) => {
      if (err) {
        reject(err.message);
      }
      console.log("Connected to database");
    });
    /* *** */

    /* Get Commodity from SQLite */
    let strSQL = `SELECT * FROM COMMODITY WHERE UUID = ?;`;
    let product = {};

    db.get(strSQL, id, (err, row) => {
      if (err) {
        reject(err.message);
      }
      if (!row) {
        product.ERROR = `Not product with id ${id}`;
      } else {
        product = row;
      }
    });
    /******/

    db.close((err) => {
      if (err) {
        reject(err.message);
      }
      console.log("Disconnect SQLite database");
      resolve(product);
    });
  });
};
