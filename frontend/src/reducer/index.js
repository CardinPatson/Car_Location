import { combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import carReducer from "./carReducer";
import { userReducer } from "./userReducer";
const rootReducer = combineReducers({
	carState: carReducer,
	userState: userReducer,
});

export default rootReducer;
