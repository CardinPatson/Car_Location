import { createReducer } from "@reduxjs/toolkit";
import { addUserGoogleInfo, addUserRegisterInfo } from "../action/userAction";
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
};

export const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(addUserRegisterInfo, (state, action) => {})
		.addCase(addUserGoogleInfo, (state, action) => {
			state.firstName = action.user.firstName;
			state.email = action.user.email;
			state.token = action.token;
		});
});
