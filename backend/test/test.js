const dotenv = require("dotenv");
var pg = require("pg");
dotenv.config();

// var connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;
var connectionString = `postgres://${process.env.DB_USERNAME_TEST}:${process.env.DB_PASSWORD_TEST}@${process.env.DB_HOST_TEST}:5432/${process.env.DB_NAME_TEST}`;

describe("postgres test", () => {
	var client;

	before(() => {
		console.log("POSTGRES_USER=" + process.env.DB_USERNAME);
		console.log("POSTGRES_PASSWORD=" + process.env.DB_PASSWORD);
		console.log("POSTGRES_DB=" + process.env.DB_NAME);
		console.log("POSTGRES_HOST=" + process.env.DB_HOST);
		console.log(connectionString);
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

	it("create a table", async () => {
		const query = await client.query("SELECT * FROM cars");
		// query.on("end", () => {
		// 	client.end();
		// });
	});

	it("select all items", () => {});
});
