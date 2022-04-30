"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"cars",
			[
				{
					name: "okooo",
					price: 500,
					brand_id: 1,
					color: "okooo",
					doors: 5,
					boot_size: 140,
					type: "okooo",
					energy: "okooo",
					is_automatic: true,
					is_available: true,
					passengers: 5,
					air_conditioning: true,
					description: "okooo",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("cars", null, {});
	},
};
