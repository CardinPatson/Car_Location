import { ADD_USER_REGISTER, GET_USER } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { auth, provider } from "../firebase";

import Axios from "axios";
const DOMAIN_NAME = "http://localhost:3001";
export const addUserRegisterInfo = createAction(
	ADD_USER_REGISTER,
	function prepare(user) {
		return {
			payload: user,
		};
	}
);

//REGISTER USER VIA FORM
export const registerUser = createAsyncThunk(
	ADD_USER_REGISTER,
	async (arg, thunkAPI) => {
		const user = await Axios.post(
			`${DOMAIN_NAME}/api/users`,
			{
				firstName: arg.firstName,
				lastName: arg.lastName,
				email: arg.email,
				password: arg.password,
			},
			{
				Headers: {
					"Content-Type": "Application/json",
				},
			}
		).catch((err) => {
			console.log(err);
		});
	}
);

//CONNECT USER VIA FORM
export const signInUser = createAsyncThunk(GET_USER, async (arg, thunkAPI) => {
	// window.location.href = "http://localhost:3001/login";
	// const payload = await auth.singInWithPopup(provider)
	const user = await Axios.get(`${DOMAIN_NAME}/auth/google`).catch((err) => {
		console.log(err);
	});
});
