import React from "react";
import { render as rtlRender } from "@testing-library/react";
import "@testing-library/jest-dom";
import { carReducer } from "../../reducer/carReducer";
import { userReducer } from "../../reducer/userReducer";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	carState: carReducer,
	userState: userReducer,
});

function render(
	ui,
	{
		preloadedState,
		store = configureStore({ reducer: rootReducer, preloadedState }),
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
