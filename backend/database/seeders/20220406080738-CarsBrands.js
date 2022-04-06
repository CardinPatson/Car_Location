"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "cars_brands",
            [
                {
                    brand: "Mercedes",
                    model: "Class A",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("cars_brands", null, {});
    }
};
