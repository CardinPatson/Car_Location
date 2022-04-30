"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("admins", {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
				// references: {
				//     model: "users",
				//     key: "id"
				// }
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("admins");
	},
};
