const server = require("../server");
const chai = require("chai");
const { agent } = require("supertest");
const { omit } = require("lodash");

const request = agent(server());
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
		const response = await request.get("/api/cars/");
		expect(response.status).to.equal(200);
		expect(response.redirect).to.equal(false);
		// expect('Content-Type', /json/)
		// expect(data).to.deep.include(shouldNotRestockProduct);
	});
});
