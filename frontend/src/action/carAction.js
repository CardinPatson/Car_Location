import { ADD_CARS, GET_CARS, GET_CARS_IMAGES, DELETE_CARS } from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const addCarsInfo = createAction(ADD_CARS, function prepare(cars) {
	return {
		payload: cars,
	};
});

export const addCarsImagesInfo = createAction(
	GET_CARS_IMAGES,
	function prepare(images) {
		return {
			payload: images,
		};
	}
);

//INSERER LA VOITURE DANS LA BASE DE DONNEES

export const addCarsProperty = createAsyncThunk(
	ADD_CARS,
	async (arg, thunkAPI) => {
		await Axios.post(
			"http://localhost:3001/api/cars/",
			{
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
				airConditioning: arg.airCondition,
				isAutomatic: arg.isAutomatic,
				isAvailable: arg.isAvailable,
			},
			{
				headers: {
					"Content-Type": "Application/json",
				},
			}
		)
			.then((rep) => {
				//TODO recuperer l'id du véhicule et faire un insertion dans la table des images
				const id = rep.data.id;
				let formData = new FormData();

				Object.values(arg.image).forEach((file) => {
					formData.append("image", file);
				});
				Axios.post(`http://localhost:3001/api/cars/${id}/images`, formData, {
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
		const cars = await Axios.get(`http://localhost:3001/api/cars`).catch(
			(err) => {
				console.error(err);
			}
		);
		thunkAPI.dispatch(addCarsInfo(cars.data));
	}
);

export const getCarsImages = createAsyncThunk(
	GET_CARS_IMAGES,
	async (arg, thunkAPI) => {
		const carsImages = await Axios.get(
			"http://localhost:3001/api/cars/images"
		).catch((err) => {
			console.error(err);
		});
		thunkAPI.dispatch(addCarsImagesInfo(carsImages.data));
	}
);

// get slot cars images
//dans le params on peut recupérer le contenu via le req.query
export const getCarsSlot = createAsyncThunk(
	"GET_CARS_SLOT",
	async (arg, thunkAPI) => {
		const request = await Axios.get(`http://localhost:3001/api/cars`, {
			params: {
				startDate: arg.startDate,
				startTime: arg.startTime,
				endDate: arg.endDate,
				endTime: arg.endTime,
			},
		}).catch((err) => {
			console.error(err);
		});
	}
);

export const deleteCars = createAsyncThunk(
	DELETE_CARS,
	async (arg, thunkAPI) => {
		console.log(arg);
		console.log(arg["id"]);
		const id = arg["id"];
		const request = await Axios.delete(
			`http://localhost:3001/api/cars/${id}`
		) .catch((err) => {
			console.error(err);
		});
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
