import { ADD_ORDER, GET_ORDERS_BY_DATE } from "./actionTypes";
import { GET_PAYMENT } from "./actionTypes";

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
// const DOMAIN_NAME = `http://${process.env.REACT_APP_URL}:${process.env.APP_PORT}`;
const DOMAIN_NAME = `${process.env.REACT_APP_URL}`;

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
		thunkAPI.dispatch(
			carsSortedWithDate(carsList.data.orders, oldStateCars)
		);
	}
);

export const addOrderInfo = createAsyncThunk(
	ADD_ORDER,
	async (arg, thunkAPI) => {
		await Axios.post(
			`${DOMAIN_NAME}/api/orders`,
			{
				idCar: arg.idCar,
				email: arg.email,
				startDate: arg.startDate,
				endDate: arg.endDate,
				totalPrice: arg.totalPrice,
			},
			{
				headers: {
					"Content-Type": "Application/json",
					Authorization: `Bearer ${arg.token}`,
				},
			}
		)
			.then((res) => {
				console.log(res);
			})
			.catch();
	}
);
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
					Authorization: `Bearer ${arg.token}`,
				},
			}
		)
			.then((res) => {
				window.location.href = res.data.url;
			})
			.catch((err) => {
				console.err(err);
			});
	}
);
