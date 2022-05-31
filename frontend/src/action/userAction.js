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

const DOMAIN_NAME = `${process.env.REACT_APP_URL}`;

/**
 * Passe les informations de l'utilisateur lors de son inscription au reducer user
 *
 * @param {Object} user object
 * @returns {Object} object
 */
export const addUserRegisterInfo = createAction(
	ADD_USER_REGISTER,
	function prepare(user) {
		return {
			payload: user,
		};
	}
);

/**
 * Passe les informations de l'utilisateur lors de sa connexion au reducer user
 *
 * @param {Object} user object
 * @returns {Object} object
 */
export const addUserSignInInfo = createAction(
	ADD_USER_SIGNIN,
	function prepare(user) {
		return {
			payload: user,
		};
	}
);

/**
 * Passe les informations google de l'utilisateur au reducer user
 *
 * @param {Object} user object
 * @returns {Object} object
 */
export const addUserGoogleInfo = createAction(
	ADD_USER_GOOGLE,
	function prepare(user) {
		return {
			payload: user,
		};
	}
);

/**
 * Supprime les informations de l'utilisateur au reducer user (Déconnexion)
 *
 * @returns {Object} object
 */
export const clearUserInfo = createAction(CLEAR_USER, function prepare() {
	return {
		payload: [],
	};
});

/**
 * Ajoute les informations de l'utilisateur dans la DB
 *
 * @param {Object} arg object
 * @returns {Object} thunkAPI object
 */
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

/**
 * Récupère les informations de l'utilisateur de la DB
 *
 * @param {Object} arg object
 * @returns {Object} thunkAPI object
 */
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

/**
 * Ajoute/Récupère les informations google de l'utilisateur dansla DB
 *
 * @param {Object} arg object
 * @returns {Object} thunkAPI object
 */
export const googleSignIn = createAsyncThunk(
	ADD_USER_GOOGLE,
	async (arg, thunkAPI) => {
		let token = "";
		console.log("inside request");
		//Récupérer les infos google de l'utilisateur
		const payload = await signInWithPopup(auth, provider).catch((err) => {
			console.error(err);
		});
		// Générer un token pour l'utilisateur
		token = await auth.currentUser.getIdToken();

		if (payload.user && token) {
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
			//Sauvegarder les infos de l'utilisateur
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

/**
 * Ajoute les informations d'un administrateur dans la DB
 *
 * @param {Object} arg object
 * @returns {Object} thunkAPI object
 */
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
