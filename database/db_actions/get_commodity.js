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

        if (parentId == 'root') {
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
                        QUANTITY quantity
                      FROM COMMODITY
                      WHERE IS_GROUP = 0 AND PARENT_UUID ${parentId}
                      ORDER BY CAST(UUID AS INTEGER);`

        db.each(strSQL, (err, row) => {
            if (err) {
                reject(err.message);
            }
            commodities.push(row);
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
