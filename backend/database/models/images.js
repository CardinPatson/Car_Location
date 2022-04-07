"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class images extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association herebelongsTo

            this.belongsTo(models.cars, {
                as: "cars",
                foreignKey: "car_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }
    images.init(
        {
            car_id: {
                type: DataTypes.INTEGER
            },
            file_names: {
                type: DataTypes.ARRAY(DataTypes.TEXT)
            }
        },
        {
            sequelize,
            modelName: "images"
        }
    );
    return images;
};
