import { ADD_CARS } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const addCarsInfo = createAction(
	ADD_CARS,
	function prepare(
		name,
		description,
		brand,
		model,
		color,
		doors,
		bootSize,
		energy,
		passengers,
		type,
		price,
		airCondition,
		isAutomatic,
		image
	) {
		return {
			payload: {
				name,
				description,
				brand,
				model,
				color,
				doors,
				bootSize,
				energy,
				passengers,
				type,
				price,
				airCondition,
				isAutomatic,
				image,
			},
		};
	}
);

//INSERER LA VOITURE DANS LA BASE DE DONNEES

export const addCarsProperty = createAsyncThunk(
	ADD_CARS,
	async (arg, thunkAPI) => {
		Axios.post("http://localhost:3001/api/cars/addCar", {
			name: arg.name,
			description: arg.description,
			brand: arg.brand,
			model: arg.model,
			color: arg.color,
			doors: arg.doors,
			bootSize: arg.bootSize,
			energy: arg.energy,
			passengers: arg.passengers,
			type: arg.type,
			price: arg.price,
			airCondition: arg.airCondition,
			isAutomatic: arg.isAutomatic,
		})
			.then((rep) => {
				//TODO recuperer l'id du véhicule et faire un insertion dans la table des images
				Axios.post(
					"http://localhost:3001/api/cars/addCarImages",
					{
						idCars: rep.id,
						tabImage: arg.image,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
					.then((rep) => {
						console.log(rep);
					})
					.catch((err) => {
						console.error(err);
					});
			})
			.catch((err) => {
				console.err(err);
			});
	}
);
