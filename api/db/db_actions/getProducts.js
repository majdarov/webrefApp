module.exports = function (db, result, args = []) {
  if (!args.length) {
    strWhere = '';
  } else {
    // console.log(args[0]);
    strWhere = ` WHERE parent_id = '${args[0]}'`;
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
