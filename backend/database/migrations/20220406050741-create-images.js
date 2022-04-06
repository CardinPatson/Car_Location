"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("images", {
            id_car: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            file_names: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.TEXT)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("images");
    }
};
