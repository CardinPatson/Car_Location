import { createReducer } from "@reduxjs/toolkit";
import { addUserRegisterInfo } from "../action/userAction";
const initialState = {
	first_name: "",
	last_name: "",
	birthday: "",
	password: "",
	birth_place: "",
	birth_country: "",
	address: "",
	telephone: 0,
	mail: "",
};

export const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(addUserRegisterInfo, (state, action) => {});
});
