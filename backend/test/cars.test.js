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

const shouldGetCars = {
	id: 3,
	name: "okooo",
	price: 500,
	brand_id: 2,
	color: "okooo",
	doors: 5,
	boot_size: 140,
	type: "okooo",
	energy: "okooo",
	is_automatic: true,
	air_conditioning: true,
	is_available: true,
	passengers: 5,
	description: "okooo",
	number_plate: null,
	year: null,
	mileage: null,
	cars_brands: { id: 2, brand: "mercedes", model: "1996" },
};

const shouldGetCarsImages = {
	id: 1,
	car_id: 1,
	file_names: ["imagesblabla.jpg", "ramadan.jpg"],
};
//Make request that fail add cars
const shouldNotAddCars = {};

describe("POST /api/cars", async () => {
	it("Should add car", async () => {
		const response = await request(server)
			.post("/api/cars/")
			.send(shouldAddCars);
		expect(response.status).to.equal(201);
	});
});

describe("GET /api/cars", async () => {
	it("Should return all cars", async () => {
		const response = await request(server).get("/api/cars/");
		expect(response.status).to.equal(200);
		expect(response.redirect).to.equal(false);
		expect(response.body).to.deep.include(shouldGetCars);
	});
});
describe("GET /api/cars/images", async () => {
	it("Should return all cars images", async () => {
		const response = await request(server).get(`/api/cars/images`);
		expect(response.status).to.equal(200);
		expect(response.body).to.deep.include(shouldGetCarsImages);
	});
});

describe("POST /api/cars/images", async () => {
	it("Should add cars images", async () => {
		// let formData = new FormData();
		// const imagesTest = ["image1.jpg", "image2.png", "image3.jpeg"];
		// imagesTest.forEach((x) => {
		// 	formData.append("image", x);
		// });
		// const response = await request(server)
		// 	.post(`/api/cars/${shouldAddCarsImages.id}images`)
		// 	.send(shouldAddCarsImages);
		// expect(response.status).to.equal(201);
	});
});
