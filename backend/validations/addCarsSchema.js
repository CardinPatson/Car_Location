const addCarsSchema = {
    name: {
        exists: { errorMessage: "Le champ nom est requis" },
        isString: {
            errorMessage: "Le champ nom doit être une chaîne de caractères"
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage:
                "Le nom doit comporter entre 3 et 30 caractères et aucun espace."
        },
        escape: true,
        errorMessage: "Le champ nom est invalide"
    },

    price: {
        exists: { errorMessage: "Le champ prix est requis" },
        isFloat: { errorMessage: "Le champ prix doit être un nombre" },
        trim: true,
        toFloat: true,
        isFloat: { options: { min: 5.0, max: 1000.0 } },
        errorMessage: "Le prix doit être un nombre compris entre 5,0 et 1000,0",
        escape: true,
        errorMessage: "Le champ prix est invalide"
    },

    brand: {
        exists: { errorMessage: "Le champ marque est requis" },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage:
                "Marque doit avoir entre 3 et 30 caractères et pas d'espaces."
        },
        escape: true,
        errorMessage: "Le champ marque est invalide"
    },

    model: {
        exists: { errorMessage: "Le champ modele est requis" },
        isLength: {
            errorMessage:
                "Modèle doit avoir entre 3 et 30 caractères et pas d'espaces.",
            options: { min: 3, max: 30 }
        },
        escape: true,
        errorMessage: "Le champ modele est invalide"
    },

    color: {
        exists: { errorMessage: "Le champ couleur est requis" },
        isAlpha: { errorMessage: "Couleur doit etre que Alphanumerique !" },
        isLength: {
            errorMessage: "Couleur doit avoir entre 3 et 30 caractères.",
            options: { min: 3, max: 30 }
        },
        escape: true,
        errorMessage: "Le champ couleur est invalide"
    },

    doors: {
        exists: { errorMessage: "Le champ nombre de porte des requis" },
        toInt: true,
        isInt: {
            options: { min: 2, max: 7 },
            errorMessage: "Le nombre de porte doit etre un nombre"
        },
        escape: true,
        trim: true,
        toInt: true,
        isInt: { options: { min: 2, max: 7 } },
        errorMessage: "Le champ nombre de porte est invalide"
    },

    bootSize: {
        exists: { errorMessage: "Le champ taille du coffre est requis" },
        toInt: true,
        isInt: {
            options: { min: 2, max: 7 },
            errorMessage:
                "La taille du coffre doit etre un nombre enntre 2 et 7"
        },
        escape: true,
        trim: true,
        toInt: true,
        isInt: { options: { min: 2, max: 7 } },
        errorMessage: "Le champ taille du coffre est invalide"
    },

    type: {
        exists: { errorMessage: "Le champ type est requis" },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage:
                "Le type doit avoir entre 3 et 30 caractères et pas d'espaces."
        },
        escape: true,
        toString: true,
        errorMessage: "Le champ type est invalide"
    },

    energy: {
        exists: { errorMessage: "Le champ energie est requis" },
        isIn: {
            options: [
                ["Essence", "Diesel", "Electrique", "Hybride", "LPG", "CNG"]
            ],
            errorMessage: "The energy type is not recognized!"
        },
        escape: true,
        errorMessage: "Le champ energie est invalide"
    },

    isAutomatic: {
        isBoolean: { errorMessage: "Automatique ou non ?" },
        exists: { errorMessage: "Le champ automatique est requis" },
        escape: true,
        trim: true,
        toBoolean: true,
        errorMessage: "Le champ automatique est invalide"
    },

    passengers: {
        exists: { errorMessage: "Le champ passager est requis" },
        toInt: true,
        isInt: {
            options: { min: 2, max: 9 },
            errorMessage: "Passager doit etre entre 2 et 9"
        },
        escape: true,
        trim: true,
        toInt: true,
        errorMessage: "Le champ passager est invalide"
    },

    airCondition: {
        isBoolean: { errorMessage: "Air Cond ou non ?" },
        exists: { errorMessage: "Le champ air condition est requis" },
        escape: true,
        trim: true,
        toBoolean: true,
        errorMessage: "Le champ air condition est invalide"
    },

    description: {
        exists: { errorMessage: "Une description est requis" },
        isLength: {
            options: { min: 3, max: 3000 },
            errorMessage:
                "Le déscription doit avoir entre 3 et 3000 caractères et pas d'espaces."
        },
        escape: true,
        trim: true,
        errorMessage: "Le champ description est invalide"
    }
};

module.exports = addCarsSchema;
