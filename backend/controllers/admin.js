const { admins, users } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
export const addAdmin = async (req, res, next) => {
	try {
		const { emailAdmin, emailUser, passwordAdmin, passwordUser } = req.body;
		//check if user already admins
		const data = await admins.findOne({ where: { mail: emailUser } });

		if (data) {
			res.status(200).json({ result: "email already an admin" });
		}

		//check if users exist in database
		const userData = await users.findOne({ where: { mail: emailUser } });

		if (!userData) {
			res
				.status(404)
				.json({ error: "Create an account before add administrator" });
		}
		//compare user password
		const hashUser = await bcrypt.compare(passwordUser, userData.password);
		if (!hashUser) {
			res
				.status(401)
				.json({ error: "Mot de passe de l'utilisateur incorrect" });
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
		res.status(200).json({
			user: userData.dataValues,
			status: "admin",
			token: jwt.sign({ user: userData.dataValues.id }, "SHORT_HASH_PHRASE", {
				expiresIn: "24h",
			}),
		});
	} catch (error) {
		res.status(500).json({ error: error });
	}
};
