"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"cars_brands",
			[
				{
					brand: "Mercedes",
					model: "Class A",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("cars_brands", null, {});
	},
};
