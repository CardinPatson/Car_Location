'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
    civility: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.TEXT,
    mail: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    address: DataTypes.TEXT,
    telephone: DataTypes.INTEGER,
    driving_licence_path: DataTypes.TEXT,
    ide_card_path: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};