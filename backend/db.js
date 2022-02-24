const Pool = require("pg").Pool;
const dotenv = require("dotenv");

//configuration de la base de données
const db = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
});

module.exports = db;
