"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("admins", {
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
                // references: {
                //     model: "customers",
                //     key: "id"
                // }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("admins");
    }
};
