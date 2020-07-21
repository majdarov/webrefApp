const sequelize = require('sequelize');
const ProductEvo = require('./productEvo');
const Barcode = require('./barcode');
const Product = require('./product');

ProductEvo.hasMany(Barcode, { /* as: 'barcodes', */ foreignKey: 'id' });
Barcode.belongsTo(ProductEvo, { foreignKey: 'id' });

Product.hasMany(Barcode, { /* as: 'barcodes', */ foreignKey: 'id' });
Barcode.belongsTo(Product, { foreignKey: 'id' });
