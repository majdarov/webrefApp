module.exports = function (db, result, pid = null) {
  if (!pid) {
    strWhere = '';
  } else {
    strWhere = ` WHERE parent_id = ${pid}`;
  }
  db.each("SELECT * FROM products" + strWhere, (err, row) => {
    if (err) {
      console.log(err.message);
      return err;
    }
    result.push(row);
  });
  return result;
};
