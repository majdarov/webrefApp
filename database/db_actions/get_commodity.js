module.exports = async function (parentId) {
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

    let commodities = [];
    let strWhere;

    if (parentId == "rootTree" || parentId == "0" || parentId === "null") {
      strWhere = "WHERE PARENT_UUID IS NULL";
    } else if (parentId === 'all') {
      strWhere = "";
    } else {
      // parentId = '= "' + parentId + '"';
      strWhere = `WHERE PARENT_UUID = "${parentId}"`;
    }
    /* Get Commodity from SQLite */
    let strSQL = `SELECT 
                        UUID,
                        NAME name,
                        CODE code,
                        PRICE_OUT price,
                        QUANTITY quantity,
                        PARENT_UUID parentCode,
                        IS_GROUP g
                      FROM COMMODITY
                      ${strWhere}
                      ORDER BY 
                        IS_GROUP DESC,
                        CAST(CODE AS INTEGER) ASC;`;

    db.all(strSQL, (err, rows) => {
      if (err) {
        reject(err.message);
      }
      rows.forEach((row) => {
        commodities.push(row);
      });
    });
    /******/

    db.close((err) => {
      if (err) {
        reject(err.message);
      }
      console.log("Disconnect SQLite database");
      resolve(commodities);
    });
  });
};
