const router = require("express").Router();
const passport = require("passport");
const usersCtrl = require("../controllers/users");

router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile"] })
);
router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		assignProperty: "federateUser",
		failureRedirect: "http://localhost:3000/connreg",
	}),
	usersCtrl.addGoogleUser
);

module.exports = router;
