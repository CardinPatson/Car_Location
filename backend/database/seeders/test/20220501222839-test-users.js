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
			"users",
			[
				{
					id: 1,
					civility: null,
					first_name: "test",
					last_name: "toto",
					password: "Toto1234",
					mail: "test.toto@gmail.com",
					birth_date: "2000-05-01",
					address: "Rue des tests de toto 13",
					telephone: null,
					driving_licence_path: null,
					ide_card_path: null,
					created_at: new Date(),
					is_active: false,
					tokens: null,
				},
				{
					id: 2,
					civility: null,
					first_name: "test",
					last_name: "tata",
					password: "Tata1234",
					mail: "test.tata@gmail.com",
					birth_date: "2000-05-01",
					address: "Rue des tests de tata 14",
					telephone: null,
					driving_licence_path: null,
					ide_card_path: null,
					created_at: new Date(),
					is_active: true,
					tokens: null,
				},
				{
					id: 3,
					civility: null,
					first_name: "test",
					last_name: "titi",
					password: "Titi1234",
					mail: "test.titi@gmail.com",
					birth_date: "2000-05-01",
					address: "Rue des tests de titi 15",
					telephone: null,
					driving_licence_path: null,
					ide_card_path: null,
					created_at: new Date(),
					is_active: true,
					tokens: null,
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
		await queryInterface.bulkDelete("users", null, {});
	},
};
