import React from "react";
import Cars from "../../cars/cars";
import { render, screen } from "../test-utils";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

// We use msw to intercept the network request during the test,
export const handlers = [
	rest.get("/api/cars", (req, res, ctx) => {
		return res(
			ctx.json({
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
			}),
			ctx.delay(150)
		);
	}),
	rest.get("/api/cars/images", (req, res, ctx) => {
		return res(
			ctx.json({
				car_id: 2,
				file_names: [
					"http://localhost:3001/images/tyler-clemmensen-d1Jum1vVLew-unsplash.jpg1651331740235.jpg",
					"http://localhost:3001/images/kevin-bhagat-3cLpiv8h5so-unsplash.jpg1651331740244.jpg",
				],
				length: 2,
				id: 1,
			}),
			ctx.delay(150)
		);
	}),
];


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

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("Get Cars", async () => {
	const history = createMemoryHistory();

	render(
		<Router location={history.location} navigator={history}>
			<Cars />
		</Router>,
		{ initialState }
	);
	// const linkElement = screen.getAllByText("Ajouter une voiture");
	// expect(linkElement).toBeInTheDocument();
	const legend = await screen.findByText("Voitures disponibles");
	expect(legend).toBeTruthy();
});
