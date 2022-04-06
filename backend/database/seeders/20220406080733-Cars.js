"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "cars",
            [
                {
                    name: "Mercedes Class A",
                    price: 150,
                    brand_id: 1,
                    color: "rouge",
                    doors: 5,
                    boot_size: 143,
                    type: "sportif",
                    energy: "Essence",
                    is_automatic: true,
                    air_conditioning: true,
                    is_available: true,
                    passengers: 4,
                    description: "belle voiture",
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("cars", null, {});
    }
};
