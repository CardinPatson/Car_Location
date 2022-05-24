const { admins, users } = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.addAdmin = async (req, res, next) => {
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
		//check if user already admins
		const data = await admins.findOne({ where: { email: emailUser } });
		if (data) {
			res.status(400).json({ error: "email already an admin" });
			return;
		}

		//check if users exist in database
		const userData = await users.findOne({ where: { mail: emailUser } });
		if (!userData) {
			res.status(404).json({ error: "User email not found" });
			return;
		}
		//compare the admin password
		const adminData = await users.findOne({ where: { mail: emailAdmin } });
		const hashAdmin = await bcrypt.compare(
			passwordAdmin,
			adminData.password
		);
		if (!hashAdmin) {
			res.status(404).json({ error: "wrong password" });
			return;
		}

		//create new admin
		const newAdmin = await admins.create({ email: emailUser });
		res.status(200).json({
			result: "Le nouvel administrateur à bien été enregistré",
		});
	} catch (error) {
		console.log("error 500");
		res.status(500).json({ error: error });
	}
};
