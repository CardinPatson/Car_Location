import { GET_ORDERS_BY_DATE } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
const DOMAIN_NAME = "http://localhost:3001";

export const carsSortedWithDate = createAction(function prepare(carsByDates) {
	return {
		payload: carsByDates,
	};
});

export const getOrdersInfoByDates = createAsyncThunk(
	GET_ORDERS_BY_DATE,
	async (arg, thunkAPI) => {
		const startDate = arg.startDate;
		const endDate = arg.endDate;
		const startTime = arg.startTime;
		const endTime = arg.endTime;
		console.log("Hello from action");
		console.log(arg);
		const carsList = await Axios.get(
			`${DOMAIN_NAME}/api/orders?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`,
			{
				headers: {
					"Content-Type": "Application/json",
				},
			}
		).catch((err) => {
			console.err(err);
		});
		thunkAPI.dispatch(carsSortedWithDate(carsList.data));
	}
);
