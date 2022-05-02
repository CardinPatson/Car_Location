const server = require("../app");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

describe("Fetch orders test", async () => {
	it("Should return all orders", async () => {
		const response = await request(server).get("/api/orders");
		expect(response.status).to.equal(200);
	});
});

module.exports = request;
