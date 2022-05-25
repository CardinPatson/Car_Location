//action import
import { addCarsInfo, addCarsImagesInfo } from "../action/carAction";
import { carsSortedWithDate } from "../action/orderAction";
import { createReducer, createSlice } from "@reduxjs/toolkit";

//FAIRE DU STATE INITIALE UN TABLEAU VIDE

// const initialState = {
//   name: "",
//   description: "",
//   brand: "",
//   model: "",
//   color: "",
//   doors: 0,
//   bootSize: 0,
//   energy: "",
//   passengers: 0,
//   type: "", //sport ou suv
//   price: 0,
//   airCondition: false,
//   isAutomatic: false,
//   images: [],
// };
const initialState = { cars: [], images: [], filterCars: [] };

//L'action addCars ne renvoie rien mais déclenchera une rafraichissement pour prendre en compte le nouveau véhicule rajouté

//CE REDUCER SERA UTILISE DANS LE CAS DUNE RECUPERATION DE VOITURE POUR LA SAUVEGARDE DE LETAT DES VOITURES EN LOCALE
const carReducer = createSlice({
	name: "cars",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addCarsInfo, (state, action) => {
				// state.push(action.payload);
				// state = [...state.slice(0, state.length)];
				state.cars = action.payload;
				state.filterCars = [];
			})
			.addCase(addCarsImagesInfo, (state, action) => {
				state.images = action.payload;
			})
			.addCase(carsSortedWithDate, (state, action) => {
				let tempId = [];
				let tempArray = [];
				//GET ALL ID CARS NOT AVAILABLE
				action.payload.carsByDates.forEach((x) =>
					tempId.push(x.car_id)
				);

				//PUSH CAR THAT NOT CORRESPOND
				for (let car of action.payload.oldStateCars) {
					if (tempId.indexOf(car.id) === -1) {
						tempArray.push(car);
					}
				}

				state.filterCars = tempArray;
			})
			.addDefaultCase((state, action) => {
				return state;
			});
	},
});

export default carReducer.reducer;
//Reducer pour la recupération des voitures
//L'etat
