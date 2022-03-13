import { ADD_CARS } from "./actionTypes";
import { createAction, createAsyncAction } from "@reduxjs/toolkit";
import Axios from "axios";

export const addCarsInfo = createAction(
	ADD_CARS,
	function prepare(
		name,
		description,
		brand,
		model,
		color,
		door,
		bootSize,
		energy,
		passengers,
		type,
		price,
		airCondition,
		automatic,
		image
	) {
		return {
			payload: {
				name,
				description,
				brand,
				model,
				color,
				door,
				bootSize,
				energy,
				passengers,
				type,
				price,
				airCondition,
				automatic,
				image,
			},
		};
	}
);

//INSERER LA VOITURE DANS LA BASE DE DONNEES

export const addCarsProperty = createAsyncAction(
	ADD_CARS,
	async (arg, thunkAPI) => {
		Axios.post("http://localhost:3001/api/cars/addCars", {
			name: arg.name,
			description: arg.description,
			brand: arg.brand,
			model: arg.model,
			color: arg.color,
			doors: arg.doors,
			boot_size: arg.boot_size,
			energy: arg.energy,
			passengers: arg.passengers,
			type: arg.type,
			price: arg.price,
			air_condition: arg.air_condition,
			is_automatic: arg.is_automatic,
		})
			.then((rep) => {
				//TODO recuperer l'id du véhicule et faire un insertion dans la table des images
				// Axios.post(
				// 	"http://localhost:3001/api/cars/addCarsImages",
				// 	{
				// 		idCars: rep.id,
				// 		tabImage: arg.image,
				// 	},
				// 	{
				// 		headers: {
				// 			"Content-Type": "application/json",
				// 		},
				// 	}
				// )
				// 	.then((rep) => {
				// 		console.log(rep);
				// 	})
				// 	.catch((err) => {
				// 		console.error(err);
				// 	});
			})
			.catch((err) => {
				console.err(err);
			});
	}
);
