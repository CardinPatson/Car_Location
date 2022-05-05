import { render, screen } from "@testing-library/react";
import AddCars from "./addCars";
import { carReducer } from "../../reducer/carReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, Provider } from "@reduxjs/toolkit";

const store = createStore(carReducer, applyMiddleware(thunk));

test("first test", () => {
	render(
		<Provider store={carReducer}>
			<AddCars />
		</Provider>
	);
	const linkElement = screen.getAllByText(/Ajouter une voiture/i);
	expect(linkElement).toBeInTheDocument();
});
