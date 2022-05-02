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
			"admins",
			[
				{
					id: 1,
					email :"test.toto@gmail.com"
				},
				{
					id: 2,
					email : "test.tata@gmail.com"
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
		 */
		await queryInterface.bulkDelete("admins", null, {});
	},
};
