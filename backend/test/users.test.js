const server = require("../app");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

describe("Fetch users test", async () => {
	it("Should return all users", async () => {
		// const response = await request(server).get("/api/users");
		// expect(response.status).to.equal(200);
	});
});
