"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.images, {
                as: "images",
                foreignKey: "car_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });

            this.belongsTo(models.cars_brands, {
                as: "cars_brands",
                foreignKey: "brand_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }
    cars.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.REAL,
            brand_id: DataTypes.INTEGER,
            color: DataTypes.STRING,
            doors: DataTypes.INTEGER,
            boot_size: DataTypes.INTEGER,
            type: DataTypes.STRING,
            energy: DataTypes.STRING,
            is_automatic: DataTypes.BOOLEAN,
            air_conditioning: DataTypes.BOOLEAN,
            is_available: DataTypes.BOOLEAN,
            passengers: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            number_plate: DataTypes.STRING,
            year: DataTypes.INTEGER,
            mileage: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "cars"
        }
    );
    return cars;
};
