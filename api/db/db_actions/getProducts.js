module.exports = function (db, result) {
  db.each("SELECT * FROM products", (err, row) => {
    if (err) {
      console.log(err.message);
      return err;
    }
    result.push(row);
  });
  return result;
};
