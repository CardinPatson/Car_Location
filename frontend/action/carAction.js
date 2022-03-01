import { ADD_CARS } from "./actionTypes";
import { createAction, createAsyncAction } from "@reduxjs/toolkit";
import Axios from "axios";

export const addCarsInfo = createAction(
	ADD_CARS,
	function prepare(
		price,
		brand,
		model,
		color,
		doors,
		boot_size,
		type,
		energy,
		is_automatic,
		passengers,
		air_condition
	) {
		return {
			payload: {
				price,
				brand,
				model,
				color,
				doors,
				boot_size,
				type,
				energy,
				is_automatic,
				passengers,
				air_condition,
			},
		};
	}
);

//INSERER LA VOITURE DANS LA BASE DE DONNEES

export const addCars = createAsyncAction(ADD_CARS, async (arg, thunkAI) => {
	Axios.post("http://localhost:3001/api/cars/", {
		name: arg.price,
		brand: arg.brand,
		model: arg.model,
		doors: arg.doors,
		boot_size: arg.boot_size,
		type: arg.type,
		energy: arg.energy,
		is_automatic: arg.is_automatic,
		passengers: arg.passengers,
		air_condition: arg.air_condition,
	})
		.then((rep) => {
			//response
			console.log(rep);
		})
		.catch((err) => {
			console.err(err);
		});
});
