import { GET_PAYMENT } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
const DOMAIN_NAME = "http://localhost:3001";

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
