const { admins, users, orders } = require("../database/models");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const isUniqueMail = async (mail) => {
	try {
		const data = await users.count({
			where: { mail: mail },
		});

		if (data > 0) {
			throw new Error("Email already exists");
		}
		return true;
	} catch (error) {
		return false;
	}
};

const getAllUsers = async (req, res) => {
	return;
};

const getUserById = async (req, res) => {
	return;
};

const getUser = async (req, res) => {
	try {
		const { email, password } = req.query;
		let status = "";
		const adminData = await admins.findOne({ where: { email: email } });
		if (adminData) {
			status = "admin";
		} else {
			status = "client";
		}
		const data = await users.findOne({ where: { mail: email } });
		//CHECK IF USERS IN DATABASE
		if (!data) {
			res.status(404).json({ error: "Utilisateur introuvable" });
			return;
		}
		//CHECK IF PASSWORD IS THE SAME
		const hash = await bcrypt.compare(password, data.password);
		if (!hash) {
			res.status(401).json({ error: "Mot de passe incorrect" });
			return;
		}
		res.status(200).json({
			user: data.dataValues,
			status: status,
			token: jwt.sign(
				{ user: data.dataValues.mail },
				"SHORT_HASH_PHRASE",
				{
					expiresIn: "24h",
				}
			),
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

const addUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		//VERIFIER SI LE USER EXISTE DEJA
		const data = await users.findOne({
			where: { mail: email },
		});
		if (data) {
			res.status(409).json({ error: `Users ${lastName} already exist` });
			return;
		}

		//ENCRYPTER LE PASSWORD DU USER
		const hash = await bcrypt.hash(password, 10);

		//CREATE USERS
		const response = await users.create({
			first_name: firstName,
			last_name: lastName,
			mail: email,
			password: hash,
		});
		res.status(200).json({
			user: data.dataValues,
			status: "client",
			token: jwt.sign(
				{ user: response.dataValues.mail },
				"SHORT_HASH_PHRASE",
				{
					expiresIn: "24h",
				}
			),
		});
		// console.log(response);
	} catch (error) {
		res.status(500).json({ error });
	}
	return;
};

//AUTHENTIFICATION VIA GOOGLE
const addGoogleUser = async (req, res, next) => {
	const { userName, userMail } = req.body;
	//check if user is in database
	const data = await users.findOne({
		where: { mail: userMail },
	});
	const adminData = await admins.findOne({ where: { email: userMail } });
	if (adminData && data) {
		res.status(200).json({ user: data.dataValues, status: "admin" });
		return;
	}
	if (data) {
		//return user in database
		res.status(200).json({ user: data.dataValues, status: "client" });
		return;
	}

	const response = await users.create({
		first_name: userName,
		mail: userMail,
	});

	res.status(200).json({ user: response.dataValues, status: "client" });
};

const updateUser = async (req, res) => {
	return;
};

const deleteUser = async (req, res) => {
	return;
};

module.exports = {
	getAllUsers,
	getUserById,
	getUser,
	addUser,
	addGoogleUser,
	updateUser,
	deleteUser,
};
