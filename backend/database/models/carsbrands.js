"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class cars_brands extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.cars, {
                as: "cars",
                foreignKey: "brand_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }
    cars_brands.init(
        {
            brand: DataTypes.STRING,
            model: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "cars_brands"
        }
    );
    return cars_brands;
};
