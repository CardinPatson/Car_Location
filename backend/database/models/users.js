"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	users.init(
		{
			civility: { type: DataTypes.STRING, allowNull: true },
			first_name: { type: DataTypes.STRING, allowNull: false },
			last_name: { type: DataTypes.STRING, allowNull: false },
			password: { type: DataTypes.TEXT, allowNull: false },
			mail: { type: DataTypes.STRING, allowNull: false },
			birth_date: { type: DataTypes.DATE, allowNull: true },
			address: { type: DataTypes.TEXT, allowNull: true },
			telephone: { type: DataTypes.INTEGER, allowNull: true },
			driving_licence_path: { type: DataTypes.TEXT, allowNull: true },
			ide_card_path: { type: DataTypes.TEXT, allowNull: true },
			// created_at: {type : DataTypes.DATE, al},
			is_active: { type: DataTypes.BOOLEAN, allowNull: true },
			// tokens: { type: DataTypes.STRING, allowNull: true },
		},
		{
			sequelize,
			modelName: "users",
		}
	);
	return users;
};
