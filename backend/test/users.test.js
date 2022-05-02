const server = require("../app");
const user = require("../database/models/users");
const chai = require("chai");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

const shouldAddUser = {
	firstName: "test",
	lastName: "exemple1",
	password: "Exemple1234",
	email: "test.exemple1@gmail.com",
};

describe("POST /api/users", async () => {
	it("Should add user", async () => {
		//look if we can send query with mocha
		const shouldPass = await request(server)
			.post("/api/users")
			.send(shouldAddUser);
		expect(shouldPass.status).to.equal(200);
	});
});

describe("GET /api/users", async () => {
	it("Should get user", async () => {
		const shouldPass = await request(server).get("/api/users/").query({
			email: "test.toto@gmail.com",
			password: "Toto1234",
		});
		expect(shouldPass.status).to.equal(401);
	});

	it("Should return 401 due to wrong password", async () => {
		const shouldFail = await request(server).get("/api/users").query({
			email: "test.titi@gmail.com",
			password: "exemple123",
		});
		expect(shouldFail.status).to.equal(401);
	});
});
