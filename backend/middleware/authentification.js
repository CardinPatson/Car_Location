const jwt = require("jsonwebtoken");
const admin = require("../firebase");
module.exports = async (req, res, next) => {
	try {
		//CHECK IF USER HAVE TOKEN
		const token = req.headers.authfirebase;
		admin
			.verifyIdToken(token)
			.then((decodedToken) => {
				console.log("in decode");
				next();
			})
			.catch((error) => {
				console.log(error);
			});
		console.log("not decode");
	} catch {
		try {
			//CHECK IF THE USER HAVE TOKEN ON CONNECTION
			const token = req.headers.authorization.split(" ")[1];
			user = jwt.verify(token, "SHORT_HASH_PHRASE").user;
			if (req.body.user && req.body.user !== user) {
				throw "Invalid user";
			} else {
				next();
			}
		} catch (error) {
			res.status(500).json({ error: new Error("Invalid request") });
		}
	}
};
