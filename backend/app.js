const dotenv = require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const carRoute = require("./routes/car");
const ordersRoute = require("./routes/orders");
const usersRoute = require("./routes/users");

//Configuration pour les variables d'environnement

const app = express();

require("./boot/auth")();
//middleware
app.use(cors());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Method",
		"POST, GET, PUT, DELETE, OPTIONS, PATCH"
	);
	next();
});
app.use(express.json());
app.use(cookieParser());
app.listen(process.env.APP_PORT, () => {
	console.log("server running on port", process.env.APP_PORT);
});

//middleware pour le stockage des images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
	require("express-session")({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

//RESTFULL API
app.use("/api/cars", carRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/users", usersRoute);
module.exports = app;
