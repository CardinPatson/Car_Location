import { combineReducers } from "@reduxjs/toolkit";
import { carReducer } from "./carReducer";
const rootReducer = combineReducers({
	carState: carReducer,
});

export default rootReducer;
