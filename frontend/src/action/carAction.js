import {
	ADD_CARS,
	GET_CARS,
	GET_CARS_IMAGES,
	DELETE_CARS,
	UPDATE_CARS,
} from "./actionTypes";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const DOMAIN_NAME = `${process.env.REACT_APP_URL}`;

/**
 * Passe les informations des voitures aux reducers cars
 *
 * @param {Object} cars object
 * @returns {Object} object
 */
export const addCarsInfo = createAction(ADD_CARS, function prepare(cars) {
	return {
		payload: cars,
	};
});

/**
 * Passe les images des voitures aux reducers cars
 *
 * @param {Object} images object
 * @returns {Object} object
 */
export const addCarsImagesInfo = createAction(
	GET_CARS_IMAGES,
	function prepare(images) {
		return {
			payload: images,
		};
	}
);

/**
 * Ajoute une voiture dans la DB
 *
 * @param {Object} arg object
 * @returns {Object} object
 */
export const addCarsProperty = createAsyncThunk(
	ADD_CARS,
	async (arg, thunkAPI) => {
		await Axios.post(
			`${DOMAIN_NAME}/api/cars/`,
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
				// Formulaire contenant l'id de voiture et ses images
				const id = rep.data.id;
				let formData = new FormData();

				Object.values(arg.image).forEach((file) => {
					formData.append("image", file);
				});

				//Requête d'insertion de la voiture dans la DB
				Axios.post(`${DOMAIN_NAME}/api/cars/${id}/images`, formData, {
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

/**
 * Récupère les infos des voitures de la DB
 *
 * @returns {Object} thunkAPI object
 */
export const getCarsProperty = createAsyncThunk(
	GET_CARS,

	async (arg, thunkAPI) => {
		const cars = await Axios.get(`${DOMAIN_NAME}/api/cars`).catch((err) => {
			console.error(err);
		});
		thunkAPI.dispatch(addCarsInfo(cars.data));
	}
);

/**
 * Récupère les images des voitures de la DB
 *
 * @returns {Object} thunkAPI object
 */
export const getCarsImages = createAsyncThunk(
	GET_CARS_IMAGES,
	async (arg, thunkAPI) => {
		const carsImages = await Axios.get(
			`${DOMAIN_NAME}/api/cars/images`
		).catch((err) => {
			console.error(err);
		});

		thunkAPI.dispatch(addCarsImagesInfo(carsImages.data));
	}
);

/**
 * Supprime une voiture de la DB
 *
 * @param {Object} arg object
 */
export const deleteCars = createAsyncThunk(
	DELETE_CARS,
	async (arg, thunkAPI) => {
		const id = arg["id"];
		await Axios.delete(`${DOMAIN_NAME}/api/cars/${id}`).catch((err) => {
			console.error(err);
		});
	}
);

/**
 * Modifie les informations d'une voiture de la DB
 *
 * @param {Object} arg object
 *
 */
export const modifyCarsProperty = createAsyncThunk(
	UPDATE_CARS,
	async (arg, thunkAPI) => {
		const id = arg["id"];
		await Axios.put(
			`${DOMAIN_NAME}/api/cars/${id}`,
			{
				newName: arg.name,
				newDescription: arg.description,
				newBrand: arg["cars_brands"].brand,
				newModel: arg["cars_brands"].model,
				newColor: arg.color,
				newDoors: arg.doors,
				newBootSize: arg.boot_size,
				newEnergy: arg.energy,
				newPassengers: arg.passengers,
				newType: arg.type,
				newPrice: arg.price,
				newAirConditioning: arg.air_condition,
				newIsAutomatic: arg.is_automatic,
				newIsAvailable: arg.is_available,
			},
			{
				headers: {
					"Content-Type": "Application/json",
				},
			}
		).catch((err) => {
			console.err(err);
		});
	}
);
