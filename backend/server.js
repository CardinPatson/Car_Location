const dotenv = require("dotenv");
const serviceExpress = require("./app");
const express = require("express");
dotenv.config()
const app = express();

serviceExpress(app);

function createHttpServer() {
	const httpServer = app.listen(process.env.APP_PORT, () => {
		console.log("server running on port 3001");
	});
	return httpServer;
}

if (require.main === module) {
	createHttpServer();
}
module.exports = createHttpServer;
