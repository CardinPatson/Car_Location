const { admins, users } = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Ajouter un nouvel administrateur
 *
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} JSON object
 */
exports.addAdmin = async (req, res) => {
	try {
		const { emailAdmin, emailUser, passwordAdmin } = req.body;

		//Data validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				message: "Invalid data",
				errors: errors.array(),
			});
		}
		//Vérifier si l'utilisateur existe dans la DB
		const userData = await users.findOne({ where: { mail: emailUser } });
		if (!userData) {
			res.status(404).json({ error: "User email not found" });
			return;
		}
		//Vérifier si l'utilisateur n'est pas déjà admin
		const data = await admins.findOne({ where: { email: emailUser } });
		if (data) {
			res.status(400).json({ error: "email already an admin" });
			return;
		}

		//Vérifier le mot de passe admin
		const adminData = await users.findOne({ where: { mail: emailAdmin } });
		const hashAdmin = await bcrypt.compare(
			passwordAdmin,
			adminData.password
		);
		if (!hashAdmin) {
			res.status(404).json({ error: "wrong password" });
			return;
		}

		//Création du nouvel admin
		const newAdmin = await admins.create({ email: emailUser });
		res.status(200).json({
			result: "Le nouvel administrateur à bien été enregistré",
		});
	} catch (error) {
		res.status(500).json({ error: error });
	}
};
