"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("cars", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            price: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            id_brand: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            color: {
                allowNull: false,
                type: Sequelize.STRING
            },
            doors: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            boot_size: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            energy: {
                allowNull: false,
                type: Sequelize.STRING
            },
            is_automatic: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            air_conditioning: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            is_available: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            passengers: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING(5000)
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
        await queryInterface.dropTable("cars");
    }
};
