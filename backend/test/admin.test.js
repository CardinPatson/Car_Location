const server = require("../app");
const chai = require("chai");
const jwt = require("jsonwebtoken");
// const { agent } = require("supertest");
const request = require("supertest");
const { omit } = require("lodash");

// const request = agent(server);
const { expect } = chai;

describe("POST /api/admins", async () => {
	it("Should return 400 email already admin", async () => {
		const response = await request(server)
			.post("/api/admins")
			.send({
				emailAdmin: "test.toto@gmail.com",
				emailUser: "test.toto@gmail.com",
				passwordAdmin: "Toto1234",
			})
			.set(
				"Authorization",
				`Bearer ${jwt.sign(
					{ user: "test.toto@gmail.com" },
					"SHORT_HASH_PHRASE",
					{
						expiresIn: "24h",
					}
				)}`
			);
		expect(response.status).to.equal(400);
		expect(response.body).to.deep.include({
			error: "email already an admin",
		});
	});

	it("Should return 404 user email not found", async () => {
		const response = await request(server)
			.post("/api/admins")
			.send({
				emailAdmin: "test.toto@gmail.com",
				emailUser: "test.wrong@gmail.com",
				passwordAdmin: "Toto1234",
			})
			.set(
				"Authorization",
				`Bearer ${jwt.sign(
					{ user: "test.toto@gmail.com" },
					"SHORT_HASH_PHRASE",
					{
						expiresIn: "24h",
					}
				)}`
			);
		expect(response.status).to.equal(404);
		expect(response.body).to.deep.include({ error: "User email not found" });
	});
	it("Should return 404 admin password incorrect", async () => {
		const response = await request(server)
			.post("/api/admins")
			.send({
				emailAdmin: "test.toto@gmail.com",
				emailUser: "test.titi@gmail.com",
				passwordAdmin: "Titi1234",
			})
			.set(
				"Authorization",
				`Bearer ${jwt.sign(
					{ user: "test.toto@gmail.com" },
					"SHORT_HASH_PHRASE",
					{
						expiresIn: "24h",
					}
				)}`
			);
		expect(response.status).to.equal(404);
		expect(response.body).to.deep.include({ error: "wrong password" });
	});

	it("Should add admin", async () => {
		const response = await request(server)
			.post("/api/admins")
			.send({
				emailAdmin: "test.toto@gmail.com",
				emailUser: "test.titi@gmail.com",
				passwordAdmin: "Toto1234",
			})
			.set(
				"Authorization",
				`Bearer ${jwt.sign(
					{ user: "test.toto@gmail.com" },
					"SHORT_HASH_PHRASE",
					{
						expiresIn: "24h",
					}
				)}`
			);
		expect(response.status).to.equal(200);
		expect(response.body).to.deep.include({
			result: "Le nouvel administrateur à bien été enregistré",
		});
	});
});
