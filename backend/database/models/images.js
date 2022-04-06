"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Images extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association herebelongsTo

            this.belongsTo(models.Cars, {
                as: "cars",
                foreignKey: "id_car",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }
    Images.init(
        {
            id_car: {
                type: DataTypes.INTEGER
            },
            pic_name: {
                type: DataTypes.ARRAY(DataTypes.TEXT)
            }
        },
        {
            sequelize,
            modelName: "Images"
        }
    );
    return Images;
};
