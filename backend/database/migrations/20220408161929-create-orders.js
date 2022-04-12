"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            car_id: {
                allowNull: false,
                type: Sequelize.INTEGER
                // references: {
                //     model: "cars",
                //     key: "id"
                // }
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER
                // references: {
                //     model: "users",
                //     key: "id"
                // }
            },
            date_order: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            departure_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            return_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            total_price: {
                allowNull: false,
                type: Sequelize.REAL
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("orders");
    }
};
