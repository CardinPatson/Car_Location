"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("customers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            civility: {
                allowNull: true,
                type: Sequelize.STRING
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            mail: {
                allowNull: true,
                type: Sequelize.STRING
            },
            birth_date: {
                allowNull: true,
                type: Sequelize.DATE
            },
            address: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            telephone: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            driving_licence_path: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            ide_card_path: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            is_active: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("customers");
    }
};
