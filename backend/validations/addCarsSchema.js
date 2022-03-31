const { body, checkSchema } = require("express-validator");

const addCarsValidateSchema = checkSchema({
	name: {
		exists: { errorMessage: "Le champ nom est requis" },
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage: "Nom doit avoir entre 3 et 30 caractères et pas d'espaces.",
		},
	},

	price: {
		exists: { errorMessage: "Le champ prix est requis" },
		toFloat: true,
		isFloat: { options: { min: 5.0, max: 1000.0 } },
		errorMessage: "Prix doit etre un nombre entre 5.0 et 1000.0",
	},

	brand: {
		exists: { errorMessage: "Le champ marque est requis" },
		isLength: {
			options: { min: 3, max: 30 },
			errorMessage:
				"Marque doit avoir entre 3 et 30 caractères et pas d'espaces.",
		},
	},

	model: {
		exists: { errorMessage: "Le champ modele est requis" },
		isLength: {
			errorMessage:
				"Modèle doit avoir entre 3 et 30 caractères et pas d'espaces.",
			options: { min: 3, max: 30 },
		},
	},

	color: {
		exists: { errorMessage: "Le champ couleur est requis" },
		isAlpha: { errorMessage: "Couleur doit etre que Alphanumerique !" },
		isLength: {
			errorMessage: "Couleur doit avoir entre 3 et 30 caractères.",
			options: { min: 3, max: 30 },
		},
	},

	doors: {
		exists: { errorMessage: "Le champ nombre de porte des requis" },
		toInt: true,
		isInt: {
			options: { min: 2, max: 7 },
			errorMessage: "Le nombre de porte doit etre un nombre",
		},
	},

	bootSize: {
		exists: { errorMessage: "Le champ taille du coffre est requis" },
		toInt: true,
		isInt: {
			options: { min: 2, max: 7 },
			errorMessage: "La taille du coffre doit etre un nombre enntre 2 et 7",
		},
	},

	type: {
		exists: { errorMessage: "Le champ type est requis" },
		isLength: {
			errorMessage:
				"Le type doit avoir entre 3 et 30 caractères et pas d'espaces.",
			options: { min: 3, max: 30 },
		},
	},

	energy: {
		exists: { errorMessage: "Le champ energie est requis" },
		isIn: {
			options: [["Essence", "Diesel", "Electrique", "Hybride", "LPG", "CNG"]],
			errorMessage: "L'Energie n'est pas reconnue !",
		},
	},

	isAutomatic: {
		isBoolean: { errorMessage: "Automatique ou non ?" },
	},

	passengers: {
		exists: { errorMessage: "Le champ passager est requis" },
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
		exists: { errorMessage: "Une description est requis" },
		isLength: {
			options: { min: 3, max: 3000 },
			errorMessage:
				"Le déscription doit avoir entre 3 et 3000 caractères et pas d'espaces.",
		},
	},
});

// const validate = (validations) => {
// 	return async (req, res, next) => {
// 		await Promise.all(validations.map((validation) => validation.run(req)));

// 		const errors = validationResult(req);
// 		if (errors.isEmpty()) {
// 			return next();
// 		}

// 		res.status(400).json({
// 			errors: errors.array(),
// 		});
// 	};
// };

module.exports = {
	addCarsValidateSchema,
	// validate,
};
