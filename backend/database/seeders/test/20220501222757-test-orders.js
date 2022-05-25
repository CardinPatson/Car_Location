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
			"orders",
			[
				{
					car_id: 2,
					user_id: 1,
					date_order: "2022-03-31T22:00:00.000Z",
					departure_date: "2022-05-04T08:00:00.000Z",
					return_date: "2022-05-15T13:00:00.000Z",
					total_price: 7680,
				},
				{
					car_id: 1,
					user_id: 1,
					date_order: "2022-04-30T12:00:00.000Z",
					departure_date: "2022-05-05T13:00:00.000Z",
					return_date: "2022-05-10T08:00:00.000Z",
					total_price: 800,
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
		await queryInterface.bulkDelete("orders", null, {});
	},
};
