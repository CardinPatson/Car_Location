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
			civility: { type: DataTypes.STRING },
			first_name: { type: DataTypes.STRING },
			last_name: { type: DataTypes.STRING },
			password: { type: DataTypes.TEXT },
			mail: { type: DataTypes.STRING },
			birth_date: { type: DataTypes.DATE },
			address: { type: DataTypes.TEXT },
			telephone: { type: DataTypes.INTEGER },
			driving_licence_path: { type: DataTypes.TEXT },
			ide_card_path: { type: DataTypes.TEXT },
			created_at: { type: DataTypes.DATE },
			is_active: { type: DataTypes.BOOLEAN },
			tokens: { type: DataTypes.STRING },
		},
		{
			sequelize,
			modelName: "users",
		}
	);
	return users;
};
