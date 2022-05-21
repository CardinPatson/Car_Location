import React from "react";
import AddCars from "../../admin/addCars";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, screen } from "../test-utils";

import app from "../../../../../backend/app";
import request from "supertest";
const chargeState = async () => {
	const cars_state = await request(app).get("/api/cars/");
	const images_state = await request(app).get("/api/cars/images");

	console.log(cars_state);

	return {
		carState: {
			cars: [cars_state],
			images: [images_state],
		},
		userState: {},
	};
};
let preloadedState = {};
async () => {
	preloadedState = await chargeState();
	console.log(preloadedState);
};

//INITIAL STATE
const initialState = {
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
};

//Pour se mocker des liens
// jest.mock("react-router-dom", () => ({
// 	Link: jest.fn().mockImplementation(({ children }) => {
// 		return children;
// 	}),
// }));

//Pour un fake return
// jest.mock("react-loader-spinner", () => {
// 	return {
// 		__esModule: true,
// 		A: true,
// 		default: () => {
// 			return <div>This is the loader</div>;
// 		},
// 	};
// });

test("Get Legend", async () => {
	const history = createMemoryHistory();
	history.push("/cars");
	render(
		<Router location={history.location} navigator={history}>
			<AddCars />
		</Router>,
		preloadedState
	);
	// const linkElement = screen.getAllByText("Ajouter une voiture");
	// expect(linkElement).toBeInTheDocument();
	expect(await screen.findByText("Ajouter une voiture")).toBeTruthy();
	expect(await screen.findByText("Nom")).toBeTruthy();
	expect(await screen.findByText("Marque")).toBeTruthy();
	expect(await screen.findByText("Modèle")).toBeTruthy();
	expect(await screen.findAllByRole("button")).toBeDisabled();
});
