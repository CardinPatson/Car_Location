const app = require("./index");

app.listen(process.env.APP_PORT, async () => {
	console.log("server running on port " + process.env.APP_PORT);
});

module.exports = app;
