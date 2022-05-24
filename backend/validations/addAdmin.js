const { body } = require("express-validator");

module.exports = [
	body("emailAdmin")
		.exists()
		.escape()
		.isEmail()
		.withMessage("Email must be a valid email"),

	body("emailUser")
		.exists()
		.escape()
		.isEmail()
		.withMessage("Email must be a valid email"),

	body("passwordAdmin")
		.exists()
		.isLength({ min: 6, max: 100 })
		.isString()
		.withMessage("Password must have more than 6 characters"),
];
