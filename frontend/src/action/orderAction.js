import { GET_ORDERS_BY_DATE } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
const DOMAIN_NAME = "http://localhost:3001";

export const carsSortedWithDate = createAction(
	GET_ORDERS_BY_DATE,
	function prepare(carsByDates) {
		console.log(carsByDates);
		return {
			payload: carsByDates,
		};
	}
);

export const getOrdersInfoByDates = createAsyncThunk(
	GET_ORDERS_BY_DATE,
	async (arg, thunkAPI) => {
		console.log("Hello from action");
		console.log(arg);
		const carsList = await Axios.get(`${DOMAIN_NAME}/api/orders`, {
			params: {
				startDate: arg.startDate,
				startTime: arg.startTime,
				endDate: arg.endDate,
				endTime: arg.endTime,
			},
		}).catch((err) => {
			console.err(err);
		});
		console.log(carsList["data"]);
		thunkAPI.dispatch(carsSortedWithDate(carsList["data"]));
	}
);
