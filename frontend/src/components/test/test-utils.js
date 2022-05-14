import React from "react";
import { render as rtlRender } from "@testing-library/react";
import "@testing-library/jest-dom";
import carReducer from "../../reducer/carReducer";
import { userReducer } from "../../reducer/userReducer";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const initialState = { cars: [], images: [], filterCars: [] };

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
