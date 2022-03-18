import { ADD_CARS, GET_CARS } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const addCarsInfo = createAction(ADD_CARS, function prepare(cars) {
	return {
		payload: cars,
	};
});

//INSERER LA VOITURE DANS LA BASE DE DONNEES

export const addCarsProperty = createAsyncThunk(
	ADD_CARS,
	async (arg, thunkAPI) => {
		await Axios.post("http://localhost:3001/api/car", {
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
				let formData = new FormData();
				formData.append("id", rep.data.rows[0].id);
				Object.values(arg.image).forEach((file) => {
					formData.append("image", file);
				});
				Axios.post("http://localhost:3001/api/car-images", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
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

//RECUPERATION DES VOITURES DANS LA BASE DE DONNEES

export const getCarsProperty = createAsyncThunk(
	GET_CARS,
	async (arg, thunkAPI) => {
		const cars = await Axios.get("http://localhost:3001/api/cars").catch(
			(err) => {
				console.error(err);
			}
		);
		console.log(cars.data);
		thunkAPI.dispatch(addCarsInfo(cars.data));
	}
);

// data: Array(1)
// 0:
// air_conditioning: true
// boot_size: 1500
// brand: "Mercedes"
// color: "Rouge"
// description: "Belle petite voiture"
// doors: 4
// energy: "Essence"
// id: 8
// id_brand: 8
// is_automatic: true
// model: "Classe A"
// name: "Berline"
// passengers: 5
// price: 1500
// type: "SUV"

// payload: {
// 			name: payload.name,
// 			description: payload.description,
// 			brand: payload.brand,
// 			model: payload.model,
// 			color: payload.color,
// 			doors: payload.doors,
// 			bootSize: payload.boot_size,
// 			energy: payload.energy,
// 			passengers: payload.passengers,
// 			type: payload.type,
// 			price: payload.price,
// 			airCondition: payload.air_conditioning,
// 			isAutomatic: payload.is_automatic,
// 		},
