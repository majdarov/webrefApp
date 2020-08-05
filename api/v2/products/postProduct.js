const ProductNew = require('../../models/productNew');
const BarcodeNew = require('../../models/barcodeNew');

module.exports = async function (req, res) {
  try {
    await ProductNew.sync();
    await BarcodeNew.sync();
    let product = await ProductNew.create(req.body);
    let barcodes;
    if (req.body.barcodes.length) {
      barcodes = await BarcodeNew.bulkCreate(
        req.body.barcodes.map((item) => {
          return { id: product.id, barcode: item };
        }),
      );
    }
    res.json(product.setBarcodes(barcodes));
  } catch (err) {
      res.send(err);
  }
};
