import React from "react";
import { render as rtlRender } from "@testing-library/react";
import "@testing-library/jest-dom";
import carReducer from "../../reducer/carReducer";
import userReducer from "../../reducer/userReducer";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// BACKEND
// const server = require("../app");
// const cars = require("../database/models/cars");
// const chai = require("chai");
// const { agent } = require("supertest");
// const request = require("supertest");
// const { omit } = require("lodash");

// import server from "../../../../backend/index";

// import request from "supertest";

// afterEach(cleanup);cleanup
// const chargeState = async () => {
// 	const cars_state = await request(server).get("/api/cars/");
// 	// const images_state = await request(server).get("/api/cars/images");

// 	console.log(cars_state);

// 	return {
// 		carState: {
// 			cars: [cars_state],
// 			images: [images_state],
// 		},
// 		userState: {},
// 	};
// };
// // let preloadedState = {};
// async () => {
// 	preloadedState = await chargeState();
// 	console.log(preloadedState);
// };

// const initialState = { cars: [], images: [], filterCars: [] };

//CONTACTER LA BASE DE DONNEES POUR RECUPERER TOUTES LES VOITURES
const preloadedState = {
	carState: {
		cars: [
			{
				air_conditioning: true,
				boot_size: 143,
				brand_id: 2,
				cars_brands: { brand: "Audi", id: 2, model: "RS 3" },
				color: "Gris Nardo",
				description: "hello",
				doors: 5,
				energy: "Essence",
				id: 2,
				is_automatic: true,
				is_available: true,
				mileage: null,
				name: "RS3_Gris-Nardo",
				number_plate: null,
				passengers: 5,
				price: 100,
				type: "Sportive",
				year: null,
			},
		],
		images: [
			{
				car_id: 2,
				file_names: [
					"http://localhost:3001/images/tyler-clemmensen-d1Jum1vVLew-unsplash.jpg1651331740235.jpg",
					"http://localhost:3001/images/kevin-bhagat-3cLpiv8h5so-unsplash.jpg1651331740244.jpg",
				],
				length: 2,
				id: 1,
			},
		],
		filterCars: [],
	},
	userState: {
		firstName: "",
		lastName: "",
		birthday: "",
		password: "",
		birthPlace: "",
		birthCountry: "",
		address: "",
		telephone: 0,
		email: "",
		token: "",
		status: "",
	},
};

const rootReducer = combineReducers({
	carState: carReducer,
	userState: userReducer,
});
const store = configureStore({ reducer: rootReducer, preloadedState });
function render(
	ui,
	{
		// preloadedState,
		// store = configureStore({ reducer: rootReducer, preloadedState }),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
