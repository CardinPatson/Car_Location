const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();

module.exports = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clienSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:3001/auth/google/callback",
			},
			(accessToken, refreshToken, profile, cb) => {
				return cb(null, profile);
			}
		)
	);

	passport.serializeUser((user, cb) => {
		cb(null, user);
	});
	passport.deserializeUser((obj, cb) => {
		cb(null, obj);
	});
};
