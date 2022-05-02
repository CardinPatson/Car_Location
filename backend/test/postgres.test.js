const dotenv = require("dotenv");
var pg = require("pg");
dotenv.config();

// var connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;
var connectionString = `postgres://${process.env.DB_USERNAME_TEST}:${process.env.DB_PASSWORD_TEST}@${process.env.DB_HOST_TEST}:5432/${process.env.DB_NAME_TEST}`;

describe("postgres test", () => {
	var client;
	before(() => {
		client = new pg.Client(connectionString);
	});

	after(() => {
		client.end();
	});

	it("test connection", (done) => {
		client.connect(function (err) {
			if (err) {
				console.error("error connecting: " + err.stack);
				throw new Error(err);
			}
			console.log("connected as id " + client.processID);
			done();
		});
	});

	it("select all cars", async () => {
		const query = await client.query("SELECT * FROM cars");
	});
	it("select all users", async () => {
		const query = await client.query("SELECT * FROM users");
	});

	it("select all items", () => {});
});
