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
                type: Sequelize.STRING,
                // unique: true,
                validate: {
                    notEmpty: true,
                    len: [3, 50],
                    isString: true,
                    toString: true
                }
            },
            price: {
                allowNull: true,
                type: Sequelize.REAL,
                validate: {
                    min: 0,
                    max: 1000,
                    isFloat: true,
                    isDecimal: true,
                    notEmpty: true,
                    isNumeric: true,
                    isInt: true
                }
            },
            brand_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "brands",
                    key: "id",
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            },
            color: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true,
                    len: [3, 50],
                    is: ["^[a-zA-Z0-9]+$", "i"]
                }
            },
            doors: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 2,
                    max: 5
                }
            },
            boot_size: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 2,
                    max: 5
                }
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true,
                    len: [3, 50],
                    isString: true,
                    toString: true
                }
            },
            energy: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true,
                    len: [3, 50],
                    isString: true,
                    toString: true,
                    isIn: [
                        [
                            "Essence",
                            "Diesel",
                            "Electrique",
                            "Hybride",
                            "LPG",
                            "CNG"
                        ],
                        "The energy must be one of the following: gasoline, diesel, electric"
                    ]
                }
            },
            is_automatic: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    notEmpty: true
                }
            },
            air_conditioning: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    notEmpty: true
                }
            },
            is_available: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    notEmpty: true
                }
            },
            passengers: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    toInt: true,
                    min: 2,
                    max: 5
                }
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING(5000),
                validate: {
                    notEmpty: true,
                    len: [3, 5000],
                    isString: true
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("cars");
    }
};
