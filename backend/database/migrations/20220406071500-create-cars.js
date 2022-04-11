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
                validate: {
                    notEmpty: true,
                    isInt: true,
                    toInt: true
                }
                // references: {
                //     model: "brands",
                //     key: "id",
                //     onUpdate: "CASCADE",
                //     onDelete: "CASCADE"
                // }
            },
            color: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true,
                    len: [3, 30],
                    isString: true,
                    toString: true
                }
            },
            doors: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    toInt: true,
                    min: 3,
                    max: 7
                }
            },
            boot_size: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    toInt: true,
                    min: 1,
                    max: 500
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
                    isInt: true,
                    toInt: true,
                    min: 2,
                    max: 7
                }
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING(5000),
                validate: {
                    notEmpty: true,
                    len: [1, 5000],
                    toString: true,
                    isString: true
                }
            },
            number_plate: {
                allowNull: true,
                type: Sequelize.STRING,
                validate: {
                    len: [3, 30],
                    isString: true,
                    toString: true
                },
                unique: false
            },
            mileage: {
                allowNull: true,
                type: Sequelize.INTEGER,
                validate: {
                    isInt: true,
                    toInt: true,
                    min: 0,
                    max: 1000000
                }
            },
            year: {
                allowNull: true,
                type: Sequelize.INTEGER,
                validate: {
                    isInt: true,
                    toInt: true,
                    min: 2000,
                    max: 2100,
                    len: [4] // 4 digits
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("cars");
    }
};
