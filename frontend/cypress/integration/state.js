import carReducer from "../../src/reducer/carReducer";
import userReducer from "../../src/reducer/userReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";


export const preloadedState = {
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
				file_names: ["/images/car_4.jpg", "/images/car_5.jpg"],
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

export default store;
