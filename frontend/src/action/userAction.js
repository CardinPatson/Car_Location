import {
	ADD_USER_REGISTER,
	ADD_ADMIN,
	ADD_USER_SIGNIN,
	ADD_USER_GOOGLE,
	CLEAR_USER,
} from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Axios from "axios";
// const DOMAIN_NAME = `http://${process.env.REACT_APP_URL}:${process.env.APP_PORT}`;
const DOMAIN_NAME = `${process.env.REACT_APP_URL}`;
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
		return {
			payload: user,
		};
	}
);

export const clearUserInfo = createAction(CLEAR_USER, function prepare() {
	return {
		payload: [],
	};
});
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
		window.location.pathname = "/";
		thunkAPI.dispatch(addUserRegisterInfo(user.data));
	}
);

//CONNECT USER VIA FORM
export const signInUser = createAsyncThunk(
	ADD_USER_SIGNIN,
	async (arg, thunkAPI) => {
		const user = await Axios.get(`${DOMAIN_NAME}/api/users`, {
			params: {
				email: arg.email,
				password: arg.password,
			},
		}).catch((err) => {
			console.log(err);
		});
		window.location.pathname = "/";
		thunkAPI.dispatch(addUserSignInInfo(user.data));
	}
);

export const googleSignIn = createAsyncThunk(
	ADD_USER_GOOGLE,
	async (arg, thunkAPI) => {
		let token = "";

		const payload = await signInWithPopup(auth, provider).catch((err) => {
			console.error(err);
		});

		// const credential = GoogleAuthProvider.credentialFromResult(payload);
		token = await auth.currentUser.getIdToken();
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
			window.location.pathname = "/";
			console.log(response);
			thunkAPI.dispatch(
				addUserSignInInfo({
					user: response.data.user,
					token: token,
					status: response.data.status,
				})
			);
		} else {
			console.warn("cannot get user");
		}
	}
);

export const registerAdmin = createAsyncThunk(
	ADD_ADMIN,
	async (arg, thunkAPI) => {
		//insert administrator
		const admin = await Axios.post(
			`${DOMAIN_NAME}/api/admins`,
			{
				emailAdmin: arg.emailAdmin,
				passwordAdmin: arg.passwordAdmin,
				emailUser: arg.emailUser,
			},
			{
				headers: {
					"Content-Type": "Application/json",
					Authorization: `Bearer ${arg.token}`,
				},
			}
		).catch((err) => {
			console.error(err);
		});
		if (admin.status === 200) {
			window.location.pathname = "/cars";
			return;
		}
		if (admin.data.error) {
			return admin.data.error;
		}
	}
);
