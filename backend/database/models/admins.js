"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class admins extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    admins.init(
        {
            email: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "admins"
        }
    );
    return admins;
};
