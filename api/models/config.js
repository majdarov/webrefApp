const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/api.db',
});

class Conf extends Model {}

Conf.init(
  {
    config_name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    config_value: DataTypes.TEXT
  },
  {
    sequelize,
    tableName: 'config_store',
    timestamps: false
  },
);

module.exports = Conf;
