const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
};
