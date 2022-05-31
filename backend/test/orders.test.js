const server = require("../app");
const orders = require("../database/models/orders");
const chai = require("chai");
const request = require("supertest");
const { omit } = require("lodash");
const { expect } = chai;

/**
 * TEST D'INTEGRATION POUR LES ROUTES ORDERS
 */
describe("GET /api/orders", async () => {
	//CAS OU ON RECUPERE LES RESERVATIONS DUN UTILISATEUR
	const shouldGetOrders1 = {
		id: 2,
		car_id: 1,
		user_id: 1,
		date_order: "2022-04-30T12:00:00.000Z",
		departure_date: "2022-05-05T13:00:00.000Z",
		return_date: "2022-05-10T08:00:00.000Z",
		total_price: 800,
	};
	it("Should return all orders", async () => {
		const shouldGetOrders2 = {
			id: 1,
			car_id: 2,
			user_id: 1,
			date_order: "2022-03-31T22:00:00.000Z",
			departure_date: "2022-05-04T08:00:00.000Z",
			return_date: "2022-05-15T13:00:00.000Z",
			total_price: 7680,
		};
		const response = await request(server).get("/api/orders");
		expect(response.status).to.equal(200);
		expect(response.body.orders).to.deep.include(shouldGetOrders1);
		expect(response.body.orders).to.deep.include(shouldGetOrders2);
	});
	it("Should return orders filter on date", async () => {
		//RECUPERATION DES RESERVATIONS SUR LA PLAGE HORAIRE
		const shouldFilterOrders = {
			startDate: "2022-04-30",
			startTime: "12:00",
			endDate: "2022-05-10",
			endTime: "08:00",
		};
		const response = await request(server)
			.get("/api/orders/")
			.query(shouldFilterOrders);
		expect(response.status).to.equal(200);
		expect(response.body.orders).to.deep.include(shouldGetOrders1);
	});
});

describe("POST /api/orders", async () => {
	//CAS OU ON AJOUTE UNE RESERVATION
	const shouldAddOrder = {
		idCar: 1,
		email: "test.tata@gmail.com",
		startDate: "2022-05-05T08:00:00.000Z",
		endDate: "2022-05-10T13:00:00.000Z",
		totalPrice: 800,
	};
	const shouldNotAddOrders = {
		idCar: 999,
		email: "test.toto@gmail.com",
		startDate: "2022-05-05",
		endDate: "2022-05-10",
		totalPrice: 800,
	};
	it("Should add order", async () => {
		const response = await request(server)
			.post("/api/orders")
			.send(shouldAddOrder);
		expect(response.status).to.equal(201);
		expect(response.body.order).to.deep.include({
			id: 3,
			car_id: 1,
			user_id: 2,
			departure_date: "2022-05-05T08:00:00.000Z",
			return_date: "2022-05-10T13:00:00.000Z",
			total_price: 800,
			//date_order: "2022-05-25T16:48:34.020Z",
		});
		console.log(response.body);
	});
	it("Should return 404 due to wrong car", async () => {
		const response = await request(server)
			.post("/api/orders")
			.send(shouldNotAddOrders);
		expect(response.status).to.equal(404);
		expect(response.body).to.deep.include({
			message: "Car not found",
		});
	});
});
describe("UPDATE /api/orders", async () => {
	//CAS OU ON MODIFIE LA RESERVATION DUN UTILISATEUR
	const shouldModifyOrders = {
		idCar: 1,
		email: "test.toto@gmail.com",
		startDate: "2022-05-05",
		endDate: "2022-05-10",
		totalPrice: 800,
	};

	it("Should modify orders", async () => {
		const response = await request(server)
			.put("/api/orders/2")
			.send(shouldModifyOrders);
		expect(response.status).to.equal(200);
	});
	it("Should fail to modify order due to wrong params", async () => {
		const response = await request(server)
			.put("/api/orders/999")
			.send(shouldModifyOrders);
		expect(response.status).to.equal(404);
		expect(response.body).to.deep.include({
			message: "Order not found",
		});
	});
});

module.exports = request;
