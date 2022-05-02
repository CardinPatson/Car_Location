const server = require("../app");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

const shouldNotRestockProduct = {
	name: "okooo",
	price: 500,
	brand_id: 1,
	color: "okooo",
	doors: 5,
	boot_size: 140,
	type: "okooo",
	energy: "okooo",
	is_automatic: true,
	is_available: true,
	passengers: 5,
	air_conditioning: true,
	description: "okooo",
};

describe("Fetch cars test", async () => {
	it("Shows all stock states", async () => {
		const response1 = await request(server).post("/api/cars/").send({
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
		});
		expect(response1.status).to.equal(201);

		const response = await request(server).get("/api/cars/");
		expect(response.status).to.equal(200);
		expect(response.redirect).to.equal(false);
		// expect('Content-Type', /json/)
		// expect(data).to.deep.include(shouldNotRestockProduct);
	});
});
