"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class orders extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	orders.init(
		{
			car_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			date_order: DataTypes.DATE,
			departure_date: DataTypes.DATE,
			return_date: DataTypes.DATE,
			total_price: DataTypes.REAL,
		},
		{
			sequelize,
			modelName: "orders",
		}
	);
	return orders;
};
