const { body } = require("express-validator");

module.exports = [
	body("firstName")
		.exists()
		.isLength({ min: 2, max: 100 })
		.escape()
		.withMessage("First name must have more than 2 characters"),

	body("lastName")
		.exists()
		.isLength({ min: 2, max: 100 })
		.escape()
		.withMessage("Last name must have more than 2 characters"),

	body("email")
		.exists()
		.escape()
		.isEmail()
		.withMessage("Email must be a valid email"),

	body("password")
		.exists()
		.isLength({ min: 6, max: 100 })
		.isString()
		.withMessage("Password must have more than 6 characters"),
];
