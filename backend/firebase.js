"use strict";
const firebaseAdmin = require("firebase-admin");

// const { initializeApp } = require("firebase-admin/app");
// const auth = require("firebase-admin/auth/index.d.ts");
const dotenv = require("dotenv");

dotenv.config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
// console.log(firebaseConfig);
const app = firebaseAdmin.initializeApp(firebaseConfig);
// const defaultAuth = auth.getAuth();

module.exports = app;
