module.exports =  async function() {
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
        let groups = [];
        /* Get Commodity from SQLite */
        let strSQL = `SELECT 
                        UUID,
                        CODE code,
                        PARENT_UUID parentCode,
                        NAME name 
                      FROM COMMODITY
                      WHERE IS_GROUP = 1
                      ORDER BY CAST(CODE AS INTEGER);`

        db.all(strSQL, (err, rows) => {
            if (err) {
                reject(err.message);
            }
            rows.forEach(row => {
                groups.push(row);
            });
        });
        /******/

        db.close(err => {
            if (err) {
                reject(err.message);
            }
            console.log('Disconnect SQLite database');
            resolve(groups);
        });  
    });
}
