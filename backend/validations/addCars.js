const { body } = require("express-validator");

module.exports = [
	body("name")
		.exists()
		.isLength({ min: 3, max: 30 })
		.trim()
		.escape()
		.withMessage("Name must have more than 5 characters"),

	body("brand")
		.exists({ checkFalsy: true })
		.isLength({ min: 2, max: 30 })
		.trim()
		.escape()
		.withMessage("Brand must have more than 5 characters"),

	body("model")
		.exists({ checkFalsy: true })
		.isLength({ min: 2, max: 30 })
		.escape()
		.withMessage("Model must have more than 5 characters"),

	body("color")
		.exists({ checkFalsy: true })
		.isLength({ min: 2, max: 30 })
		.escape()
		.withMessage("Color must have more than 5 characters"),

	body("doors")
		.exists({ checkFalsy: true })
		.isInt({ min: 2, max: 7 })
		.withMessage("Doors must be an integer between 2 and 5"),

	body("bootSize")
		.exists({ checkFalsy: true })
		.isFloat({ min: 1.0, max: 500.0 })
		.withMessage("Boot size must be an integer between 2 and 5"),

	body("energy")
		.exists({ checkFalsy: true })
		.escape()
		.trim()
		.isIn(["Essence", "Diesel", "Electrique", "Hybride", "LPG", "CNG"])
		.withMessage(
			"Energy must be one of the following: Essence, Diesel, Electrique, Hybride, LPG, CNG"
		),

	body("passengers")
		.exists({ checkFalsy: true })
		.escape()
		.isInt({ min: 1, max: 7 })
		.withMessage("Passengers must be an integer between 1 and 7"),

	body("type")
		.exists({ checkFalsy: true })
		.escape()
		.trim()
		.isIn(
			[
				"Berline",
				"Break",
				"Coupe",
				"Cabriolet",
				"Monospace",
				"SUV",
				"4x4",
				"Fourgonnette",
				"Sportive",
			],
			{
				caseSensitive: false,
			}
		)
		.withMessage(
			"Type must be one of the following: Cabriolet, Coupe, Sport, SUV, Van, Berline",
			"Sportive"
		),

	body("isAutomatic")
		.exists({ checkFalsy: true })
		.isBoolean()
		.withMessage("Is automatic must be a boolean"),

	body("airConditioning")
		.exists({ checkFalsy: true })
		.isBoolean()
		.withMessage("Air conditioning must be a boolean"),

	body("isAvailable")
		.exists({ checkFalsy: true })
		.isBoolean()
		.withMessage("Is available must be a boolean"),

	body("price")
		.exists({ checkFalsy: true })
		.isFloat({ min: 1.0, max: 1000.0 })
		.withMessage("Price must be an integer between 1 and 1 000 Euro"),

	body("description")
		.exists({ checkFalsy: true })
		.isLength({ min: 5, max: 1000 })
		.withMessage("Description must have less than 1000 characters"),
];
