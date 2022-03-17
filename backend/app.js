const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const carRoute = require("./routes/car");
const client = require("./db");

//Configuration pour les variables d'environnement
dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.listen(process.env.APP_PORT, () => {
	console.log("server running on port", process.env.APP_PORT);
});

//middleware pour le stockage des images
app.use("/images", express.static(path.join(__dirname, "images")));

//RESTFULL API
app.use("/api", carRoute);

module.exports = app;
