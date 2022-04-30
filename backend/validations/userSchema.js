const { body } = require("express-validator");

module.exports = [
	body("firstName")
		.exists({ checkFalsy: true })
		.withMessage("Le champ firstName est requis")
		.isString()
		.isLength({ min: 3, max: 30 }),

	body("lastName")
		.exists({ checkFalsy: true })
		.withMessage("le champ lastName est requis")
		.isString()
		.isLength({ min: 3, max: 30 }),
	body("email")
		.exists({ checkFalsy: true })
		.withMessage("le champ email est requis")
		.isEmail()
		.isLength({ min: 3, max: 30 }),
	body("password")
		.exists({ checkFalsy: true })
		.withMessage("password is required")
		.isString()
		.isLength({ min: 5, max: 30 }),
];
