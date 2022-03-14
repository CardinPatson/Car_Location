//action import
import { addCarsInfo } from "../action/carAction";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  brand: "",
  model: "",
  color: "",
  doors: 0,
  bootSize: 0,
  energy: "",
  passengers: 0,
  type: "", //sport ou suv
  price: 0,
  airCondition: false,
  isAutomatic: false,
  images: [],
};

//L'action addCars ne renvoie rien mais déclenchera une rafraichissement pour prendre en compte le nouveau véhicule rajouté

//CE REDUCER SERA UTILISE DANS LE CAS DUNE RECUPERATION DE VOITURE POUR LA SAUVEGARDE DE LETAT DES VOITURES EN LOCALE
export const carReducer = createReducer(initialState, (builder, state) => {
  builder.addCase(addCarsInfo, (state, action) => {
    state.name = action.payload.name;
    state.description = action.payload.description;
    state.brand = action.payload.brand;
    state.model = action.payload.model;
    state.price = action.payload.price;
    state.doors = action.payload.doors;
    state.bootSize = action.payload.bootSize;
    state.type = action.payload.type;
    state.energy = action.paylad.energy;
  });
});

//Reducer pour la recupération des voitures
//L'etat
