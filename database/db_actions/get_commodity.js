module.exports =  async function(parentId) {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();

        /* Get Commodity from tabletposDB */
        let db = new sqlite3.Database('database/tabletposDB', (err) => {
            if (err) {
                reject(err.message);
            }
            console.log('Connected to database');
        });
        /* *** */

        let commodities = [];

        if (parentId == 'rootTree') {
            parentId = 'IS NULL'
        } else {
            parentId = '= "' + parentId + '"';
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
                      WHERE PARENT_UUID ${parentId}
                      ORDER BY 
                        IS_GROUP DESC,
                        CAST(CODE AS INTEGER) ASC;`

        db.all(strSQL, (err, rows) => {
            if (err) {
                reject(err.message);
            }
            rows.forEach(row => {
                commodities.push(row);
            });
        });
        /******/

        db.close(err => {
            if (err) {
                reject(err.message);
            }
            console.log('Disconnect SQLite database');
            resolve(commodities);
        });  
    });
}
