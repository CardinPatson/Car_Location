const { admins, users } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.addAdmin = async (req, res, next) => {
	try {
		const { emailAdmin, emailUser, passwordAdmin, passwordUser } = req.body;
		//check if user already admins
		const data = await admins.findOne({ where: { email: emailUser } });
		if (data) {
			res.status(400).json({ error: "email already an admin" });
			return;
		}

		//check if users exist in database
		const userData = await users.findOne({ where: { mail: emailUser } });
		if (!userData) {
			res
				.status(404)
				.json({ error: "Create an account before add administrator" });
			return;
		}
		//compare user password
		if (!userData.dataValues.password) {
			res.status(400).json({
				error:
					"Veuillez configurer un mot de passe pour le nouvel administrateur",
			});
			return;
		}
		const hashUser = await bcrypt.compare(
			passwordUser,
			userData.dataValues.password
		);

		if (!hashUser) {
			console.log("error pass user");

			res
				.status(401)
				.json({ error: "Mot de passe de du nouvel administrateur incorrect" });
			return;
		}
		//compare the admin password
		const adminData = await users.findOne({ where: { mail: emailAdmin } });
		const hashAdmin = await bcrypt.compare(passwordAdmin, adminData.password);
		if (!hashAdmin) {
			res
				.status(401)
				.json({ error: "Mot de passe de l'administrateur incorrect" });
			return;
		}

		//create new admin
		const newAdmin = await admins.create({ email: emailUser });
		res
			.status(200)
			.json({ result: "Le nouvel administrateur à bien été enregistré" });
	} catch (error) {
		console.log("error 500");
		res.status(500).json({ error: error });
	}
};
