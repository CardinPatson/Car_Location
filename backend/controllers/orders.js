const { cars, orders, users } = require("../database/models");
const { Op } = require("sequelize");
const moment = require("moment");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Difference between two dates in dates
 *
 * @param {Date} date1 Departure date
 * @param {Date} date2 Return date
 *
 * @returns {Number} Difference between two dates in days
 */
function differenceBetweenDates(date1, date2) {
	const diff = Math.abs(date2.getTime() - date1.getTime());
	return Math.ceil(diff / (1000 * 3600 * 24));
}

// const date1 = new Date("2022-12-17T13:24:00");

/**
 * Get all orders
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @returns {Object} All orders
 */
const getAllOrders = async (req, res) => {
	try {
		let ordersData;
		if (!Object.keys(req.query).length) {
			ordersData = await orders.findAll();
			//LA REQUETE NE PASSE PAS AVEC LES INCLUDES
			// {
			// 	include: [
			// 		{
			// 			model: cars,
			// 			as: "car",
			// 		},
			// 		{
			// 			model: users,
			// 			as: "user",
			// 		},
			// 	];
			// }
		} else if (Object.keys(req.query).length === 4) {
			//TODO QUAND ON RECUPERE LA DATE IL FAIT UNE SOUSTRACTION DUNE HEURE DONT LA DATE QUE LON RECOIT EST DIFFERENTE DE CELLE DANS LA BASE DE DONNEES;
			//TODO TRAVAILLER SUR LES DATES QUE LON INSERE DANS LA DB POUR QUELLE SOIT COHERENTE AVEC CELLE RECUPERER

			const { startDate, startTime, endDate, endTime } = req.query;

			ordersData = await orders.findAll({
				where: {
					[Op.or]: [
						{
							[Op.and]: [
								{
									departure_date: {
										[Op.lte]: new Date(
											`${startDate}T${startTime}:00.000Z`
										).toISOString(),
									},
								},
								{
									return_date: {
										[Op.gte]: new Date(
											`${startDate}T${startTime}:00.000Z`
										).toISOString(),
									},
								},
							],
						},
						{
							[Op.and]: [
								{
									departure_date: {
										[Op.gte]: new Date(
											`${startDate}T${startTime}:00.000Z`
										).toISOString(),
									},
								},
								{
									return_date: {
										[Op.lte]: new Date(
											`${endDate}T${endTime}:00.000Z`
										).toISOString(),
									},
								},
							],
						},
						{
							[Op.and]: [
								{
									departure_date: {
										[Op.lte]: new Date(
											`${endDate}T${endTime}:00.000Z`
										).toISOString(),
									},
								},
								{
									return_date: {
										[Op.gte]: new Date(
											`${endDate}T${endTime}:00.000Z`
										).toISOString(),
									},
								},
							],
						},
					],
				},
			});
		}
		return res.status(200).json({
			orders: ordersData,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Error getting all orders",
		});
	}
};

/**
 * Return a specific order by id
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @returns {Object} Order
 */
const getOrderById = async (req, res) => {
	try {
		const orderId = parseInt(req.params.order_id);

		const orderData = await orders.findByPk(orderId, {
			include: [
				{
					model: cars,
					as: "car",
				},
				{
					model: users,
					as: "user",
				},
			],
		});

		if (orderData) {
			return res.status(200).json({
				order: orderData,
			});
		} else {
			return res.status(404).json({
				message: "Order not found",
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

// return price of cars from date departure to date return

/**
 * Return price of cars from date departure to date return
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @returns {Object} Price of cars
 */
const getPrice = async (req, res) => {
	try {
		const carId = parseInt(req.params.car_id);

		const { departure_date, return_date } = req.body;

		const carData = await cars.findByPk(carId);

		if (carData) {
			const price =
				differenceBetweenDates(departure_date, return_date) *
				carData.price;

			return res.status(200).json({
				price: price,
			});
		} else {
			return res.status(404).json({
				message: "Car not found",
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

/**
 * Create a new order
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @returns {Object} Order
 */
const addOrder = async (req, res) => {
	try {
		//NEST EFFECTUER QUE SI ON A TOUTES LES INFOS DU USER
		// const carId = parseInt(req.params.carId);

		const { idCar, startDate, endDate, email, totalPrice } = req.body;

		//const userActive = await isUserActive(orderData.user_id);

		// if (!userActive) {
		// 	return res.status(404).json({
		// 		message: "user not Active",
		// 	});
		// }

		const carData = await cars.findByPk(idCar);

		if (!carData) {
			return res.status(404).json({
				message: "Car not found",
			});
		}

		//find user
		const dataUser = await users.findOne({
			email: email,
		});

		// const nbrOfDays = differenceBetweenDates(startDate, endDate);

		// const price = carData.price * nbrOfDays;

		const orderData = await orders.create({
			car_id: idCar,
			user_id: dataUser.dataValues.id,
			departure_date: startDate,
			return_date: endDate,
			total_price: totalPrice,
		});

		return res.status(201).json({
			message: "Order created",
			order: orderData,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

/**
 * Update an order
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @returns {Object} Order
 */
const updateOrder = async (req, res) => {
	try {
		const orderId = parseInt(req.params.order_id);

		const { carId, userId, departureDate, returnDate, totalPrice } =
			req.body;

		const orderData = await orders.findByPk(orderId);

		if (!orderData) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		const carData = await cars.findByPk(carId);

		if (!carData) {
			return res.status(404).json({
				message: "Car not found",
			});
		}

		const userData = await users.findByPk(userId);

		if (!userData) {
			return res.status(404).json({
				message: "user not found",
			});
		}

		const nbrOfDays = differenceBetweenDates(departureDate, returnDate);

		const price = carData.price * nbrOfDays;

		const updatedOrderData = await orders.update(
			{
				car_id: carId,
				user_id: userId,
				departure_date: departureDate,
				return_date: returnDate,
				total_price: price,
			},
			{
				where: {
					id: orderId,
				},
			}
		);

		return res.status(200).json({
			message: "Order updated",
			order: updatedOrderData,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

// front
const YOUR_DOMAIN = `${process.env.APP_IP}:${process.env.APP_PORT}`;
const FRONT_DOMAIN = "http://localhost:3000";

const PRICE_ID = "price_1KmyUUAid8mWK1L4RVC47QQ8";
const CLIENT_MAIL = "bellaalirachid@gmail.com";
const QUANTITY = 1;

/**
 * Initialize payment session with Stripe
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @returns {Object} Payment session
 */
const payement = async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		customer_email: CLIENT_MAIL,
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: PRICE_ID,
				quantity: QUANTITY,
			},
		],
		mode: "payment",
		success_url: `${FRONT_DOMAIN}/paymentAccepted`,
		cancel_url: `${FRONT_DOMAIN}/paymentDenied`,
	});
	// res.header("Access-Control-Allow-Origin", FRONT_DOMAIN); // update to match the domain you will make the request from
	// res.header(
	// 	"Access-Control-Allow-Headers",
	// 	"Origin, X-Requested-With, Content-Type, Accept"
	// );
	res.json({ url: session.url }); // <-- this is the changed line
};

module.exports = {
	getAllOrders,
	getOrderById,
	addOrder,
	getPrice,
	updateOrder,
	payement,
};
