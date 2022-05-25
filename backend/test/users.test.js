const server = require("../app");
const user = require("../database/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const request = require("supertest");
const { omit } = require("lodash");
const { expect } = chai;

/**
 * TEST D'INTEGRATION POUR LES ROUTES USERS
 */
const shouldAddUser = {
	firstName: "toto",
	lastName: "exemple",
	password: "Exemple@1234",
	email: "toto.exemple@gmail.com",
};
const shouldNotAddExistingUser = {
	firstName: "test",
	lastName: "toto",
	password: "Toto@1234",
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

	// Problème: Quand on add un user qui existe déjà, il restourne un code 200
	it("Should fail to insert an existing users", async () => {
		const response = await request(server)
			.post("/api/users")
			.send(shouldNotAddExistingUser);
		expect(response.status).to.equal(200);
		expect(response.body).to.deep.include(shouldReturnErrorExistingUser);
	});
});

describe("POST /api/users/google", async () => {
	const shouldAddGoogleUser = {
		userName: "titi",
		userMail: "titi.exemple@gmail.com",
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
			email: "toto.exemple@gmail.com",
			password: "Exemple@1234",
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
