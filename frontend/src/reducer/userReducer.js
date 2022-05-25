import { createSlice } from "@reduxjs/toolkit";
import {
	addUserGoogleInfo,
	addUserRegisterInfo,
	addUserSignInInfo,
	clearUserInfo,
} from "../action/userAction";
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

const userReducer = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addUserRegisterInfo, (state, action) => {
				state.firstName = action.payload.user.firstName;
				state.lastName = action.payload.user.lastName;
				state.email = action.payload.user.email;
			})
			.addCase(addUserSignInInfo, (state, action) => {
				if (action.payload.user.first_name)
					state.firstName = action.payload.user.first_name;
				if (action.payload.user.last_name)
					state.lastName = action.payload.user.last_name;
				if (action.payload.user.birth_day)
					state.birthday = action.payload.user.birth_day;
				if (action.payload.user.birth_place)
					state.birthPlace = action.payload.user.birth_place;
				if (action.payload.user.birth_country)
					state.birthCountry = action.payload.user.birth_country;
				if (action.payload.user.address)
					state.address = action.payload.user.address;
				if (action.payload.user.telephone)
					state.telephone = action.payload.user.telephone;
				if (action.payload.user.mail)
					state.email = action.payload.user.mail;
				if (action.payload.token) state.token = action.payload.token;
				if (action.payload.status) state.status = action.payload.status;
			})
			.addCase(addUserGoogleInfo, (state, action) => {
				console.log(action);
				console.log("Hellooooo");
				state.firstName = action.payload.firstName;
				state.email = action.payload.email;
				state.token = action.payload.token;
			})
			.addCase(clearUserInfo, (state, payload) => {
				state = initialState;

				return state;
			})
			.addDefaultCase((state, action) => {});
	},
});

export default userReducer.reducer;
