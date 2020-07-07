const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/products.db',
});
const Conf = require('./config');

class ProductsEvo extends Model {
  // static async configStore() {
  //   let store;
  //   store = await Conf.findOne({
  //     attributes: ['config_name', 'config_value'],
  //     where: { config_name: 'store_id' },
  //   });
  //   this.storeId = store.config_value;
  // }
}

ProductsEvo.init(
  {
    type: { type: DataTypes.TEXT, defaultValue: 'NORMAL' }, //'NORMAL'
    name: {
      //"Н кпр 93.5*3(0,8мм)(250гр.)"
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'newTestProduct',
    },
    code: {
      //823
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: true
    },
    price: {
      //325
      type: DataTypes.DECIMAL(2, 10),
      defaultValue: 0,
    },
    cost_price: {
      //250
      type: DataTypes.DECIMAL(2, 10),
      defaultValue: 0,
    },
    quantity: {
      //0
      type: DataTypes.DECIMAL(3, 10),
      defaultValue: 0,
    },
    measure_name: {
      //'шт'
      type: DataTypes.TEXT,
      defaultValue: 'шт',
    },
    tax: {
      //'NO_VAT'
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'NO_VAT',
    },
    allow_to_sell: {
      //'true'
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: DataTypes.TEXT, //null
    article_number: DataTypes.TEXT, //null
    parent_id: DataTypes.UUID, //'96639e0c-6409-9faa-d4e0-a8212b9fa795'
    id: {
      //"586A9524-61EA-C21C-BC9F-BBA6188AB47A"
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    store_id: {
      type: DataTypes.UUID,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    created_at: {
      //'2019-08-12T09:49:49.651+0000'
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      //'2019-08-12T09:49:49.669+0000'
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // barcodes: {
    //   //'2073210008232'
    //   type: DataTypes.TEXT,
    // },
  },
  {
    sequelize,
    tableName: 'products_evo',
    timestamps: false,
  },
);

module.exports = ProductsEvo;
