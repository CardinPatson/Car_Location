"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("cars_brands", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            brand: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            model: {
                allowNull: false,
                type: Sequelize.TEXT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("cars_brands");
    }
};
