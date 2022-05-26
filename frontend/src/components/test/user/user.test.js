import React from "react";
import userReducer from "../../../reducer/userReducer";
import {
	addUserRegisterInfo,
	addUserSignInInfo,
	addUserGoogleInfo,
	clearUserInfo,
} from "../../../action/userAction";

const initialState = {
	firstName: "",
	lastName: "",
	birthday: "",
	password: "",
	birthPlace: "",
	birthCountry: "",
	address: "",
	telephone: 0,
	email: "",
	token: "",
	status: "",
};

const userState = {
	user: {
		firstName: "Aymar",
		lastName: "Davy Hakizimana",
		email: "aymar.hakiz@gmail.com",
	},
};

const fullUserState = {
	user: {
		first_name: "Aymar",
		last_name: "Davy Hakizimana",
		birth_day: "02-02-1997",
		password: "hbeuyb_jubuzj-$µ8284e6__",
		birth_place: "Amsterdam",
		birth_country: "Burundi",
		address: "?",
		telephone: 0,
		mail: "aymar.hakiz@gmail.com",
	},
	status: "admin",
	token: "9353847167584631631",
};

const googleUserState = {
	firstName: "Aymar",
	email: "aymar.hakiz@gmail.com",
	token: "9353847167584631631",
};
// const expectedStateRegisterInfo = {
// 	firstName: "Aymar",
// 	lastName: "Davy Hakizimana",
// 	birthday: "",
// 	password: "",
// 	birthPlace: "",
// 	birthCountry: "",
// 	address: "",
// 	telephone: 0,
// 	email: "aymar.hakiz@gmail.com",
// 	token: "",
// 	status: "",
// };

test("should add user by filling the initialState", () => {
	expect(userReducer(undefined, addUserRegisterInfo(userState))).toEqual({
		firstName: "Aymar",
		lastName: "Davy Hakizimana",
		birthday: "",
		password: "",
		birthPlace: "",
		birthCountry: "",
		address: "",
		telephone: 0,
		email: "aymar.hakiz@gmail.com",
		token: "",
		status: "",
	});
});

test("should fill initialState with all the user's info", () => {
	expect(userReducer(initialState, addUserSignInInfo(fullUserState))).toEqual(
		{
			firstName: "Aymar",
			lastName: "Davy Hakizimana",
			birthday: "02-02-1997",
			password: "",
			birthPlace: "Amsterdam",
			birthCountry: "Burundi",
			address: "?",
			telephone: 0,
			email: "aymar.hakiz@gmail.com",
			token: "9353847167584631631",
			status: "admin",
		}
	);
});

test("should fill initialState with all the google user's info", () => {
	expect(
		userReducer(initialState, addUserGoogleInfo(googleUserState))
	).toEqual({
		firstName: "Aymar",
		lastName: "",
		birthday: "",
		password: "",
		birthPlace: "",
		birthCountry: "",
		address: "",
		telephone: 0,
		email: "aymar.hakiz@gmail.com",
		token: "9353847167584631631",
		status: "",
	});
});

test("should clear all the user's info", () => {
	expect(userReducer(initialState, clearUserInfo())).toEqual({
		firstName: "",
		lastName: "",
		birthday: "",
		password: "",
		birthPlace: "",
		birthCountry: "",
		address: "",
		telephone: 0,
		email: "",
		token: "",
		status: "",
	});
});
