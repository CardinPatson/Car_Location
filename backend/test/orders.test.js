const server = require("../app");
const orders = require("../database/models/orders");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

describe("GET /api/orders", async () => {
	const shouldGetOrders1 = {
		id: 1,
		car_id: 1,
		user_id: 1,
		date_order: "2022-04-30T12:00:00.000Z",
		departure_date: "2022-05-05T13:00:00.000Z",
		return_date: "2022-05-10T08:00:00.000Z",
		total_price: 800,
	};
	it("Should return all orders", async () => {
		const shouldGetOrders2 = {
			id: 2,
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
		//Try to insert parameters
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
	const shouldAddOrder = {
		carId: 1,
		userId: 1,
		dateOrder: "2022-04-30T12:00:00.000Z",
		departureDate: "2022-05-05T13:00:00.000Z",
		returnDate: "2022-05-10T08:00:00.000Z",
	};
	const shouldNotAddOrders = {
		id: 1,
		userId: 1,
		dateOrder: "2022-04-30T12:00:00.000Z",
		departureDate: "2022-05-05T13:00:00.000Z",
		returnDate: "2022-05-10T08:00:00.000Z",
		totalPrice: 800,
	};
	it("Should add order", async () => {
		// const response = await request(server)
		// 	.post("/api/orders")
		// 	.send(shouldAddOrder);
		// expect(response.status).to.equal(201);
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

module.exports = request;
