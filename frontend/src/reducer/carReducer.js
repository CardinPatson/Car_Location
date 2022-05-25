import { addCarsInfo, addCarsImagesInfo } from "../action/carAction";
import { carsSortedWithDate } from "../action/orderAction";
import { createSlice } from "@reduxjs/toolkit";

//Etat initiale des voitures
const initialState = { cars: [], images: [], filterCars: [] };

/**
 * Reducteur pour les voitures (stocke/supprime/modifie l'état des voitures en local)
 *
 * @param {Object} initialState object
 * @param {Object} name string
 * @param {Object} reducer object (contient les fonctions redux : qui gèrent les types d'action)
 * @returns {Object} object
 */
const carReducer = createSlice({
	name: "cars",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addCarsInfo, (state, action) => {
				// Ajouter les informations des voitures à l'état(local)
				state.cars = action.payload;
				state.filterCars = [];
			})
			.addCase(addCarsImagesInfo, (state, action) => {
				//Ajout des images des voitures à l'état(local)
				state.images = action.payload;
			})
			.addCase(carsSortedWithDate, (state, action) => {
				//Filtre les voitures sur la date

				let tempId = [];
				let tempArray = [];

				//Récupérer tous les id non disponible
				action.payload.carsByDates.forEach((x) =>
					tempId.push(x.car_id)
				);

				//Ajouter les voitures qui ne corresponde pas au id précédent
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
