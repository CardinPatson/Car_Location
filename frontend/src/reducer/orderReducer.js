import { carsSortedWithDate } from "../action/orderAction";
import { createReducer } from "@reduxjs/toolkit";

const initialState = { cars: [] };

export const orderReducer = createReducer(initialState, (builder) => {
	builder.addCase(carsSortedWithDate, (state, action) => {
		state.cars = action.payload;
	});
});
