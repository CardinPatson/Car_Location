const server = require("../app");
const user = require("../database/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
const shouldNotAddExistingUser = {
	firstName: "test",
	lastName: "toto",
	password: "Toto1234",
	email: "test.toto@gmail.com",
};

const shouldReturnErrorPassword = { error: "Mot de passe incorrect" };
const shouldReturnErrorMail = { error: "Utilisateur introuvable" };
const shouldReturnErrorExistingUser = {
	error: `Users ${shouldNotAddExistingUser.lastName} already exist`,
};

describe("POST /api/users", async () => {
	it("Should add user", async () => {
		//look if we can send query with mocha
		const response = await request(server)
			.post("/api/users")
			.send(shouldAddUser);
		expect(response.status).to.equal(200);
		expect(response.request._data).to.deep.include(shouldAddUser);
	});

	it("Should fail to insert an existing users", async () => {
		const response = await request(server)
			.post("/api/users")
			.send(shouldNotAddExistingUser);
		expect(response.status).to.equal(500);
		expect(response.body).to.deep.include(shouldReturnErrorExistingUser);
	});
});

describe("POST /api/users/google", async () => {
	const shouldAddGoogleUser = {
		userName: "exemple2",
		userMail: "test.exemple2@gmail.com",
	};
	it("it should add google user", async () => {
		//Don't know how to generate a token identification for goolgle
		const response = await request(server)
			.post("/api/users/google")
			.send(shouldAddGoogleUser)
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
		expect(response.body.user.first_name).to.deep.include(
			shouldAddGoogleUser.userName
		);

		expect(response.body.user.mail).to.deep.include(
			shouldAddGoogleUser.userMail
		);
		expect(response.body.status).to.deep.include("client");
	});
});

describe("GET /api/users", async () => {
	it("Should get user", async () => {
		const response = await request(server).get("/api/users/").query({
			email: "test.exemple1@gmail.com",
			password: "Exemple1234",
		});
		expect(response.statusCode).to.equal(200);
		expect(response.body.user.first_name).to.deep.include(
			shouldAddUser.firstName
		);
		expect(response.body.user.last_name).to.deep.include(
			shouldAddUser.lastName
		);
		expect(response.body.user.mail).to.deep.include(shouldAddUser.email);
	});

	it("Should return 401 due to wrong password", async () => {
		const response = await request(server).get("/api/users").query({
			email: "test.titi@gmail.com",
			password: "exemple123",
		});
		expect(response.status).to.equal(401);
		expect(response.body).to.deep.include(shouldReturnErrorPassword);
	});

	it("Should return 404 due to wrong mail", async () => {
		const response = await request(server).get("/api/users").query({
			email: "test.wrong@gmail.com",
			password: "exemple123",
		});
		expect(response.status).to.equal(404);
		expect(response.body).to.deep.include(shouldReturnErrorMail);
	});
});