const dotenv = require("dotenv");
var pg = require("pg");
dotenv.config();

var connectionString = `postgres://${process.env.DB_USERNAME_TEST}:${process.env.DB_PASSWORD_TEST}@${process.env.DB_HOST_TEST}:5432/${process.env.DB_NAME_TEST}`;

/**
 * TEST DE CONNEXION A LA DB DE TEST
 */
describe("postgres test", () => {
	var client;
	before(() => {
		//connnexion
		client = new pg.Client(connectionString);
	});

	after(() => {
		client.end();
	});

	it("test connection", (done) => {
		client.connect(function (err) {
			if (err) {
				throw new Error(err);
			}
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
