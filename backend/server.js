const http = require("http");
const serviceExpress = require("./app");
const express = require("express");

const app = express();

serviceExpress(app);

function createHttpServer() {
	const httpServer = app.listen(3001,"0.0.0.0", () => {
		console.log("server running on port 3001");
	});
	return httpServer;
}

if (require.main === module) {
	createHttpServer();
}
module.exports = createHttpServer();
