"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("admins", {
			user_id: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
					isInt: true,
					toInt: true,
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
