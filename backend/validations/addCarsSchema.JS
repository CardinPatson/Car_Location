const { body } = require("express-validator");

const addCarsValidateSchema = {
  name: {
    isLength: {
      errorMessage:
        "Le nom doit avoir entre 3 et 30 caractères et pas d'espaces.",
      options: { min: 3, max: 30 },
    },
  },
  price: {},
  brand: {
    isLength: {
      errorMessage:
        "Le marque doit avoir entre 3 et 30 caractères et pas d'espaces.",
      options: { min: 3, max: 30 },
    },
  },
  model: {
    isLength: {
      errorMessage:
        "Le modèle doit avoir entre 3 et 30 caractères et pas d'espaces.",
      options: { min: 3, max: 30 },
    },
  },
  color: {},
  doors: {},
  bootSize: {},
  type: {
    isLength: {
      errorMessage:
        "Le type doit avoir entre 3 et 30 caractères et pas d'espaces.",
      options: { min: 3, max: 30 },
    },
  },
  energy: {},
  isAutomatic: {},
  passengers: {},
  airCondition: {},
  description: {
    isLength: {
      options: { min: 3, max: 3000 },
    },
    errorMessage:
      "Le déscription doit avoir entre 3 et 3000 caractères et pas d'espaces.",
  },
};

module.exports = {
  addCarsValidateSchema,
};
