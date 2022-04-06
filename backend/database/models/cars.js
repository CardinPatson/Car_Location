"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Images, {
                as: "images",
                foreignKey: "id_car",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });

            this.belongsTo(models.CarsBrands, {
                as: "cars_brands",
                foreignKey: "id_brand",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }
    Cars.init(
        {
            id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            id_brand: DataTypes.INTEGER,
            color: DataTypes.STRING,
            doors: DataTypes.INTEGER,
            boot_size: DataTypes.INTEGER,
            type: DataTypes.STRING,
            energy: DataTypes.STRING,
            is_automatic: DataTypes.BOOLEAN,
            air_conditioning: DataTypes.BOOLEAN,
            is_available: DataTypes.BOOLEAN,
            passengers: DataTypes.INTEGER,
            description: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Cars"
        }
    );
    return Cars;
};
