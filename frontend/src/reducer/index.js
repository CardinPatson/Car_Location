import { combineReducers } from "@reduxjs/toolkit";
import carReducer from "./carReducer";
import userReducer from "./userReducer";

//Lier les differents reducteurs qui seront utilisé par le store
const rootReducer = combineReducers({
	carState: carReducer,
	userState: userReducer,
});

export default rootReducer;
