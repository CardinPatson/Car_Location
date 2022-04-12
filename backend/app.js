const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const carRoute = require("./routes/car");
const ordersRoute = require("./routes/orders");
const usersRoute = require("./routes/users");

//Configuration pour les variables d'environnement

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
app.use("/api/cars", carRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/users", usersRoute);

module.exports = app;
