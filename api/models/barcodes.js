const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/products.db',
});

class Barcodes extends Model {}

Barcodes.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    barcode: DataTypes.TEXT
  },
  {
    sequelize,
    tableName: 'barcodes',
    timestamps: false
  },
);

module.exports = Barcodes;
