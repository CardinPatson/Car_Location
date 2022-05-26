const app = require("./index");
const fs = require("fs");
const https = require("https");

const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.APP_PORT, async () => {
	console.log("server running on port " + process.env.APP_PORT);
});

module.exports = app;
