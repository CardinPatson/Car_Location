const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const carRoute = require("./routes/car");

//Configuration pour les variables d'environnement
dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//middleware pour le stockage des images
app.use("/images", express.static(path.join(__dirname, "images")));


//RESTFULL API 
app.use("/api/cars" , carRoute);


module.exports = app;