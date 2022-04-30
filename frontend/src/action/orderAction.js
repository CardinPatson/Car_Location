import { GET_ORDERS_BY_DATE } from "./actionTypes";
import { GET_PAYMENT } from "./actionTypes";

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
const DOMAIN_NAME = "http://localhost:3001";

export const carsSortedWithDate = createAction(
	GET_ORDERS_BY_DATE,
	function prepare(carsByDates, oldStateCars) {
		return {
			payload: { carsByDates, oldStateCars },
		};
	}
);

export const getOrdersInfoByDates = createAsyncThunk(
	GET_ORDERS_BY_DATE,
	async (arg, thunkAPI) => {

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
		const oldStateCars = thunkAPI.getState().carState.cars;
		thunkAPI.dispatch(carsSortedWithDate(carsList.data.orders, oldStateCars));
export const postPaymentPage = createAsyncThunk(
	GET_PAYMENT,
	async (arg, thunkAPI) => {
		await Axios.post(
			`${DOMAIN_NAME}/api/orders/create-checkout-session`,
			{},
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "Application/json",
				},
			}
		)
			.then((res) => {
				console.log(res.data.url);
				window.location.href = res.data.url;
			})
			.catch((err) => {
				console.err(err);
			});
	}
);
