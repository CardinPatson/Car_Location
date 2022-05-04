"use strict";
const bcrypt = require("bcrypt");
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
		const hashToto = await bcrypt.hash("Toto1234", 10);
		const hashTiti = await bcrypt.hash("Titi1234", 10);
		const hashTata = await bcrypt.hash("Tata1234", 10);
		await queryInterface.bulkInsert(
			"users",
			[
				{
					civility: null,
					first_name: "test",
					last_name: "toto",
					password: hashToto,
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
					civility: null,
					first_name: "test",
					last_name: "tata",
					password: hashTata,
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
					civility: null,
					first_name: "test",
					last_name: "titi",
					password: hashTiti,
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
