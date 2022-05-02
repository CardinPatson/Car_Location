const server = require("../app");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

describe("Fetch admins test", async () => {
	it("Should return all admins", async () => {
		const response = await request("http://localhost:3001").get(
			"/api/cars/images"
		);
		expect(response.status).to.equal(200);
	});
});
