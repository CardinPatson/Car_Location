const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const carRoute = require("./routes/car");
const ordersRoute = require("./routes/orders");
const usersRoute = require("./routes/users");
const adminsRoute = require("./routes/admin");
const app = express();

const serverExpress = (app) => {
	//middleware
	app.use(cors());
	app.use(
		cors({
			origin: `${process.env.APP_IP}:${process.env.APP_PORT}`,
			credentials: true,
		})
	);
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

	//middleware pour le stockage des images
	app.use("/images", express.static(path.join(__dirname, "images")));

	app.use(
		require("express-session")({
			secret: "keyboard cat",
			resave: false,
			saveUninitialized: false,
		})
	);

	//RESTFULL API
	app.use("/api/cars", carRoute);
	app.use("/api/orders", ordersRoute);
	app.use("/api/users", usersRoute);
	app.use("/api/admins", adminsRoute);
};
// async () => {
// await
// };
serverExpress(app);
module.exports = app;
