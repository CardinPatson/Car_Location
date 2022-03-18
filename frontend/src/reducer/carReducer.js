//action import
import { addCarsInfo } from "../action/carAction";
import { createReducer } from "@reduxjs/toolkit";

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
const initialState = { cars: [] };

//L'action addCars ne renvoie rien mais déclenchera une rafraichissement pour prendre en compte le nouveau véhicule rajouté

//CE REDUCER SERA UTILISE DANS LE CAS DUNE RECUPERATION DE VOITURE POUR LA SAUVEGARDE DE LETAT DES VOITURES EN LOCALE
export const carReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(addCarsInfo, (state, action) => {
			// state.push(action.payload);
			// state = [...state.slice(0, state.length)];
			state.cars = action.payload;
			
		})
		.addDefaultCase((state, action) => {
			return state;
		});
});

//Reducer pour la recupération des voitures
//L'etat
