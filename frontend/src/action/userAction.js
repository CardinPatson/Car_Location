import {
	ADD_USER_REGISTER,
	ADD_USER_SIGNIN,
	ADD_USER_GOOGLE,
	GET_USER,
} from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

export const addUserSignInInfo = createAction(
	ADD_USER_SIGNIN,
	function prepare(user) {
		return {
			payload: user,
		};
	}
);

export const addUserGoogleInfo = createAction(
	ADD_USER_GOOGLE,
	function prepare(user) {
		//firstname and email
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
		thunkAPI.dispatch(addUserRegisterInfo(user.data));
		window.location.pathname = "/";
	}
);

//CONNECT USER VIA FORM
export const signInUser = createAsyncThunk(GET_USER, async (arg, thunkAPI) => {
	const user = await Axios.get(`${DOMAIN_NAME}/user`, {
		params: {
			email: arg.email,
			password: arg.password,
		},
	}).catch((err) => {
		console.log(err);
	});
	thunkAPI.dispatch(addUserSignInInfo(user.data));
	window.location.pathname = "/";
});

export const googleSignIn = createAsyncThunk(
	GET_USER,
	async (arg, thunkAPI) => {
		let token = "";

		const payload = await signInWithPopup(auth, provider).catch((err) => {
			console.error(err);
		});

		// const credential = GoogleAuthProvider.credentialFromResult(payload);
		token = await auth.currentUser.getIdToken();
		console.log("token -->", token);
		console.log(payload);
		if (payload.user && token) {
			//check if user is in database or not
			const response = await Axios.post(
				`${DOMAIN_NAME}/api/users/google`,
				{
					userName: payload.user.displayName,
					userMail: payload.user.email,
				},
				{
					headers: {
						AuthFirebase: token,
					},
				}
			).catch((err) => {
				console.error(err);
			});
			console.log(response);
			thunkAPI.dispatch(
				addUserGoogleInfo({ user: response.data, token: token })
			);
			window.location.pathname = "/";
			console.log("response -->", response);
		} else {
			console.warn("cannot get user");
		}
	}
);
