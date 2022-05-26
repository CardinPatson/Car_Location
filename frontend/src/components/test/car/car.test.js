import React from "react";
import Cars from "../../cars/cars";
import ModifyDetails from "../../cars/modifyDetails";
import { render, screen, act } from "../test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import carReducer from "../../../reducer/carReducer";
import { addCarsImagesInfo, addCarsInfo } from "../../../action/carAction";
import { carsSortedWithDate } from "../../../action/orderAction";
// import { rest } from "msw";
// import { setupServer } from "msw/node";

// We use msw to intercept the network request during the test,
const initialState = { cars: [], images: [], filterCars: [] };

const carProperty = {
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
};

const imageProperty = {
	car_id: 2,
	file_names: [
		"http://localhost:3001/images/tyler-clemmensen-d1Jum1vVLew-unsplash.jpg1651331740235.jpg",
		"http://localhost:3001/images/kevin-bhagat-3cLpiv8h5so-unsplash.jpg1651331740244.jpg",
	],
	length: 2,
	id: 1,
};

const carsList = {
	oldStateCars: [
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
		{
			air_conditioning: false,
			boot_size: 143,
			brand_id: 2,
			cars_brands: { brand: "Porsche", id: 3, model: "O.8" },
			color: "Rouge",
			description: "hello",
			doors: 3,
			energy: "Essence",
			id: 3,
			is_automatic: false,
			is_available: true,
			mileage: null,
			name: "RS3_Gris-Nardo",
			number_plate: null,
			passengers: 5,
			price: 100,
			type: "Sportive",
			year: null,
		},
		{
			air_conditioning: false,
			boot_size: 143,
			brand_id: 2,
			cars_brands: { brand: "Porsche", id: 3, model: "O.8" },
			color: "Rouge",
			description: "hello",
			doors: 3,
			energy: "Essence",
			id: 4,
			is_automatic: false,
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
	carsByDates: [
		{
			car_id: 2,
		},
		{
			car_id: 3,
		},
	],
};

const carsLeft = [
	{
		air_conditioning: false,
		boot_size: 143,
		brand_id: 2,
		cars_brands: { brand: "Porsche", id: 3, model: "O.8" },
		color: "Rouge",
		description: "hello",
		doors: 3,
		energy: "Essence",
		id: 4,
		is_automatic: false,
		is_available: true,
		mileage: null,
		name: "RS3_Gris-Nardo",
		number_plate: null,
		passengers: 5,
		price: 100,
		type: "Sportive",
		year: null,
	},
];

// export const handlers = [
// 	rest.get("/api/cars", (req, res, ctx) => {
// 		return res(ctx.json({ data: carProperty }), ctx.delay(150));
// 	}),
// 	rest.get("/api/cars/images", (req, res, ctx) => {
// 		return res(ctx.json({ data: imageProperty }), ctx.delay(150));
// 	}),
// ];

// const server = setupServer(...handlers);

// Enable API mocking before tests.
// beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
// afterAll(() => server.close());

//UNIT TEST ON CARS REDUCER
test("should return the initial state", () => {
	expect(carReducer(undefined, {})).toEqual({
		cars: [],
		images: [],
		filterCars: [],
	});
});

test("should return the car state", () => {
	expect(carReducer(undefined, addCarsInfo(carProperty))).toEqual({
		cars: carProperty,
		images: [],
		filterCars: [],
	});
});
test("should return the image state", () => {
	expect(carReducer(undefined, addCarsImagesInfo(imageProperty))).toEqual({
		cars: [],
		images: imageProperty,
		filterCars: [],
	});
});

test("should sort cars", () => {
	expect(
		carReducer(
			undefined,
			carsSortedWithDate(
				carsList["carsByDates"],
				carsList["oldStateCars"]
			)
		)
	).toEqual({
		cars: [],
		images: [],
		filterCars: carsLeft,
	});
});

// END TO END TEST OF CARS PAGE
test("Get Cars", async () => {
	const history = createMemoryHistory();
	history.push("/cars");

	render(
		<Router location={history.location} navigator={history}>
			<Cars />
		</Router>
	);

	const clickHandler = jest.fn((evt) => {
		// Create a simulated click event function
		evt.preventDefault();
		evt.stopPropagation();
		history.push("/carDetails");
	});

	//Bind the simulated click event function to the button
	screen.getByText("Détails").onclick = (evt) => clickHandler(evt);

	//Expect on page
	expect(await screen.findByText("Voitures disponibles")).toBeTruthy();
	expect(await screen.findAllByText("Type")).toBeTruthy();
	expect(await screen.findAllByText("Places")).toBeTruthy();
	act(() => {
		userEvent.click(screen.getByRole("button", { name: "Détails" }));
	});
	expect(clickHandler).toHaveBeenCalled(); //Assert that the click envent is called
	expect(history.location.pathname).toBe("/carDetails");
});

// test("Test modifyCarDetails", async () => {
// 	const history = createMemoryHistory();
// 	history.push("/modifyDetails");

// 	render(
// 		<Router location={history.location} navigator={history}>
// 			<Cars />
// 		</Router>
// 	);

// 	const clickHandler = jest.fn((evt) => {
// 		// Create a simulated click event function
// 		evt.preventDefault();
// 		evt.stopPropagation();
// 		history.push("/carDetails");
// 	});

// 	//Bind the simulated click event function to the button
// 	screen.getByText("Détails").onclick = (evt) => clickHandler(evt);

// 	//Expect on page
// 	expect(await screen.findByText("Voitures disponibles")).toBeTruthy();
// 	expect(await screen.findAllByText("Type")).toBeTruthy();
// 	expect(await screen.findAllByText("Places")).toBeTruthy();
// 	act(() => {
// 		userEvent.click(screen.getByRole("button", { name: "Détails" }));
// 	});
// 	expect(clickHandler).toHaveBeenCalled(); //Assert that the click envent is called
// 	expect(history.location.pathname).toBe("/carDetails");
// });
