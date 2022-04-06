"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CarsBrands extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Cars, {
                as: "cars",
                foreignKey: "id_brand",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }
    CarsBrands.init(
        {
            id: DataTypes.INTEGER,
            brand: DataTypes.TEXT,
            model: DataTypes.TEXT
        },
        {
            sequelize,
            modelName: "CarsBrands"
        }
    );
    return CarsBrands;
};
