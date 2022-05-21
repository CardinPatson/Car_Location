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
		 * sequelize-cli seed:generate --name test-products
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
					boot_size: 140.0,
					type: "Berline",
					energy: "Essence",
					is_automatic: true,
					is_available: true,
					passengers: 5,
					air_conditioning: true,
					description: "okooo est une belle voiture",
				},
				{
					name: "merco",
					price: 150,
					brand_id: 1,
					color: "rouge",
					doors: 5,
					boot_size: 143.0,
					type: "Monospace",
					energy: "Essence",
					is_automatic: true,
					air_conditioning: true,
					is_available: true,
					passengers: 4,
					description: "belle voiture de type sportif",
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
