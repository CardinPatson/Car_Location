const server = require("../app");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

describe("Fetch admins test", async () => {
	it("Should post an admin", async () => {
		// const response = await request(server).get("/api/admins");
		// expect(response.status).to.equal(200);
	});
});
