const { body } = require("express-validator");

const addCarsValidateSchema = {
	name: {
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage: "Nom doit avoir entre 3 et 30 caractères et pas d'espaces.",
		},
	},

	price: {
		toFloat: true,
		isFloat: { options: { min: 5.0, max: 1000.0 } },
		errorMessage: "Prix doit etre un nombre entre 5.0 et 1000.0",
	},

	brand: {
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage:
				"Marque doit avoir entre 3 et 30 caractères et pas d'espaces.",
		},
	},

	model: {
		isLength: {
			errorMessage:
				"Modèle doit avoir entre 3 et 30 caractères et pas d'espaces.",
			options: { min: 3, max: 30 },
		},
	},

	color: {
		isAlpha: { errorMessage: "Couleur doit etre que Alphanumerique !" },
		isLength: {
			errorMessage: "Couleur doit avoir entre 3 et 30 caractères.",
			options: { min: 3, max: 30 },
		},
	},

	doors: {
		toInt: true,
		isInt: {
			options: { min: 2, max: 7 },
			errorMessage: "Le nombre de porte doit etre un nombre",
		},
	},

	bootSize: {
		toInt: true,
		isInt: {
			options: { min: 2, max: 7 },
			errorMessage: "La taille du coffre doit etre un nombre enntre 2 et 7",
		},
	},

	type: {
		isLength: {
			errorMessage:
				"Le type doit avoir entre 3 et 30 caractères et pas d'espaces.",
			options: { min: 3, max: 30 },
		},
	},

	energy: {
		isIn: {
			options: [["Essence", "Diesel", "Electrique", "Hybride", "LPG", "CNG"]],
			errorMessage: "L'Energie n'est pas reconnue !",
		},
	},

	isAutomatic: {
		isBoolean: { errorMessage: "Automatique ou non ?" },
	},

	passengers: {
		toInt: true,
		isInt: {
			errorMessage: "Passager doit etre entre 2 et 9",
			options: { min: 2, max: 9 },
		},
	},

	airCondition: {
		isBoolean: { errorMessage: "Air Cond ou non ?" },
	},

	description: {
		isLength: {
			options: { min: 3, max: 3000 },
			errorMessage:
				"Le déscription doit avoir entre 3 et 3000 caractères et pas d'espaces.",
		},
	},
};

const validate = (validations) => {
	return async (req, res, next) => {
		console.log(validations);
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		res.status(400).json({
			errors: errors.array(),
		});
	};
};

module.exports = {
	addCarsValidateSchema,
	validate,
};
