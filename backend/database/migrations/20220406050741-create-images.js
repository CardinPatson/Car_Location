"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("images", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            car_id: {
                autoIncrement: false,
                primaryKey: false,
                allowNull: false,
                type: Sequelize.INTEGER
                // references: {
                //     model: "cars",
                //     key: "id"
                // },
                // onUpdate: "CASCADE",
                // onDelete: "CASCADE"
            },
            file_names: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.TEXT)
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("images");
    }
};
