const server = require("../app");
const cars = require("../database/models/cars");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

const shouldAddCars = {
	name: "okooo",
	price: 500,
	brand: "mercedes",
	model: "1996",
	color: "okooo",
	doors: 5,
	bootSize: 140,
	type: "okooo",
	energy: "okooo",
	isAutomatic: true,
	isAvailable: true,
	passengers: 5,
	airConditioning: true,
	description: "okooo",
};

//Make request that fail add cars
const shouldNotAddCars = {};

describe("GET /api/cars", async () => {
	it("Should return all cars", async () => {
		const response = await request(server).get("/api/cars/");
		expect(response.status).to.equal(200);
		expect(response.redirect).to.equal(false);
		// expect('Content-Type', /json/)
		// expect(data).to.deep.include(shouldNotRestockProduct);
	});
});

describe("POST /api/cars", async () => {
	it("Should add car", async () => {
		const response = await request(server)
			.post("/api/cars/")
			.send(shouldAddCars);
		expect(response.status).to.equal(201);
	});
});

describe("GET /api/cars/images", async () => {
	it("Should return all cars images", async () => {
		const response = await request(server).get(`/api/cars/images`);
		expect(response.status).to.equal(200);
	});
});

describe("POST /api/cars/images", async () => {
	it("Should add cars images", async () => {
		//should post a formData with images
		// const response = await request(server)
		// 	.post(`/api/cars/${shouldAddCarsImages.id}images`)
		// 	.send(shouldAddCarsImages);
		// expect(response.status).to.equal(201);
	});
});
