import { combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { carReducer } from "./carReducer";
import { userReducer } from "./userReducer";
import { orderReducer } from "./orderReducer";
const rootReducer = combineReducers({
	carState: carReducer,
	userState: userReducer,
	orderState: orderReducer,
});

export default rootReducer;
