import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	price: 0,
	brand: "",
	model: "",
	color: "",
	doors: 0,
	boot_size: 0,
	type: "", //sport ou suv
	energy: 0,
	is_automatic: false, //
	passengers: 0,
	air_condition: false,
};

export const carReducer = createReducer(initialState, (builder, state) => {});
