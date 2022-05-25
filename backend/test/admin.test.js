const server = require("../app");
const chai = require("chai");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const { omit } = require("lodash");
const { expect } = chai;
/**
 * TEST D'INTEGRATION POUR L'INSERTION D'UN ADMINISTRATEUR DANS LA DB
 */
describe("POST /api/admins", async () => {
	//CAS OU LEMAIL USER EST DEJA ADMIN
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
	//CAS OU L'EMAIL USER NEXISTE PAS
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
		expect(response.body).to.deep.include({
			error: "User email not found",
		});
	});
	//CAS OU LE PASSWORD ADMIN EST INCORRECT
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
	//CAS OU LES INFORMATIONS SONT CORRECT
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
