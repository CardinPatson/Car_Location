import { ADD_ORDER, GET_ORDERS_BY_DATE } from "./actionTypes";
import { GET_PAYMENT } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const DOMAIN_NAME = `${process.env.REACT_APP_URL}`;

/**
 * Passe les informations des voitures filtrées sur la date aux reducers cars
 *
 * @param {Object} carsByDates object
 * @param {Object} oldStateCars object
 * @returns {Object} object
 */
export const carsSortedWithDate = createAction(
	GET_ORDERS_BY_DATE,
	function prepare(carsByDates, oldStateCars) {
		return {
			payload: { carsByDates, oldStateCars },
		};
	}
);

/**
 * Récupère les voitures filtrées sur la date
 *
 * @param {Object} arg object
 * @returns {Object} thunkAPI object
 */
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

		//recupération de l'ancien état
		const oldStateCars = thunkAPI.getState().carState.cars;
		thunkAPI.dispatch(
			carsSortedWithDate(carsList.data.orders, oldStateCars)
		);
	}
);

/**
 * Ajoute une réservation d'un utilisateur
 *
 * @param {Object} arg object
 * @returns {Object} thunkAPI object
 */
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
			.then((res) => {})
			.catch();
	}
);

/**
 * Procède au paiement de l'utilisateur
 *
 */
export const postPaymentPage = createAsyncThunk(
	GET_PAYMENT,
	async (arg, thunkAPI) => {
		await Axios.post(
			`${DOMAIN_NAME}/api/orders/create-checkout-session`,
			{ email: arg.email },
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
