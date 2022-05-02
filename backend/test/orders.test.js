const server = require("../app");
const orders = require("../database/models/orders");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

const shouldAddOrder = {
	carId: 1,
	userId: 1,
	dateOrder: "2022-04-30T12:00:00.000Z",
	departureDate: "2022-05-05T13:00:00.000Z",
	returnDate: "2022-05-10T08:00:00.000Z",
};

const shouldNotAddOrders = {
	id: 1,
	// carId: 1,
	userId: 1,
	dateOrder: "2022-04-30T12:00:00.000Z",
	departureDate: "2022-05-05T13:00:00.000Z",
	returnDate: "2022-05-10T08:00:00.000Z",
	totalPrice: 800,
};

const shouldFilterOrders = {
	startDate: "2022-04-30",
	startTime: "12:00",
	endDate: "2022-05-10",
	endTime: "08:00",
};
describe("GET /api/orders", async () => {
	it("Should return all orders", async () => {
		const response = await request(server).get("/api/orders");
		expect(response.status).to.equal(200);
	});
	it("Should return orders filter on date", async () => {
		//Try to insert parameters
		const response = await request(server)
			.get("/api/orders/")
			.query(shouldFilterOrders);
		expect(response.status).to.equal(200);
	});
});

describe("POST /api/orders", async () => {
	it("Should add order", async () => {
		// const response = await request(server)
		// 	.post("/api/orders")
		// 	.send(shouldAddOrder);
		// expect(response.status).to.equal(201);
	});
	it("Should not add orders", async () => {
		const response = await request(server)
			.post("/api/orders")
			.send(shouldNotAddOrders);
		expect(response.status).to.equal(404);
	});
});

module.exports = request;
